package com.utils;

import java.io.ByteArrayOutputStream;
import java.io.PrintStream;
import java.util.stream.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

import jdk.jshell.JShell;
import jdk.jshell.SnippetEvent;
import jdk.jshell.SourceCodeAnalysis;
import jdk.jshell.Diag;

import com.models.CommandOutput;


public class JShellExecutor {

    private List<SnippetEvent> events;
    private List<CommandOutput> output;
    private ByteArrayOutputStream baosOut = new ByteArrayOutputStream();
    private Stream<Diag> diagnosticsStream;
    private List<Diag> diagnosticsList;
    private String errorText;
    private JShell jshell;
    private PrintStream outstream;


    public JShellExecutor() {
        try {
           outstream = new PrintStream(baosOut, true, "UTF-8");
           jshell = JShell.builder().out(outstream).build();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    public List<CommandOutput> evaluateCommand(String input){
            String content = input;
            events = new ArrayList<SnippetEvent>();
            output = new ArrayList<CommandOutput>();
            while (true) {
                SourceCodeAnalysis.CompletionInfo an = jshell.sourceCodeAnalysis().analyzeCompletion(content);
                if (!an.completeness().isComplete()) {
                    break;
                }
                for(SnippetEvent e: jshell.eval(trimNewlines(an.source()))){
                    events.add(e);
                    CommandOutput co = new CommandOutput();
                    co.setStatus(e.status().toString());
                    co.setCommand(e.snippet().source());
                    String rep;
                    try {
                        switch (e.status()){
                            case VALID:
                                rep = new String(baosOut.toByteArray(), "UTF-8");
                                co.setOutput(rep);
                                break;
                            case REJECTED:
                                diagnosticsStream = jshell.diagnostics(e.snippet());
                                diagnosticsList = diagnosticsStream.collect(Collectors.toList());
                                errorText = diagnosticsList.get(0).getMessage(Locale.ENGLISH);
                                diagnosticsStream.close();
                                co.setOutput("Error: " + errorText);
                                break;
                            case OVERWRITTEN:
                                co.setOutput("Overwritten class");
                                break;
                            default:
                                diagnosticsStream = jshell.diagnostics(e.snippet());
                                diagnosticsList = diagnosticsStream.collect(Collectors.toList());
                                errorText = diagnosticsList.get(0).getMessage(Locale.ENGLISH);
                                diagnosticsStream.close();
                                if (diagnosticsList.get(0).isError()) {
                                    co.setStatus("ERROR");
                                }
                                else {
                                    co.setStatus("WARNING");
                                }
                                co.setOutput("Error: " + errorText);
                                break;
                        }
                        baosOut.reset();
                    }
                    catch (Exception ex){
                        ex.printStackTrace();
                    }
                    output.add(co);
                }
                if (an.remaining().isEmpty()) {
                    break;
                }
                content = an.remaining();
            }
        return output;
       }

    private String trimNewlines(String s) {
        int b = 0;
        while (b < s.length() && s.charAt(b) == '\n') {
            ++b;
        }
        int e = s.length() -1;
        while (e >= 0 && s.charAt(e) == '\n') {
            --e;
        }
        return s.substring(b, e + 1);
    }
}
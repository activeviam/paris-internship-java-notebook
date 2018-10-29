package utils;

import java.io.ByteArrayOutputStream;
import java.io.PrintStream;
import java.util.ArrayList;
import java.util.List;

import jdk.jshell.JShell;
import jdk.jshell.SnippetEvent;
import jdk.jshell.SourceCodeAnalysis;

import models.CommandOutput;


public class JShellExecutor {

    private List<SnippetEvent> events;
    private List<String> resultList;
    private List<CommandOutput> output;
    private ByteArrayOutputStream baos = new ByteArrayOutputStream();
    
    public JShellExecutor(){
        resultList = new ArrayList<String>();
    }

    public List<CommandOutput> evaluateCommand(String input){
        try (PrintStream outstream = new PrintStream(baos, true, "UTF-8")) {
            try (JShell jshell = JShell.builder().out(outstream).build()){
                String content = input;
                events = new ArrayList<SnippetEvent>();
                resultList = new ArrayList<String>();
                output = new ArrayList<CommandOutput>();
                while (true) {
                    SourceCodeAnalysis.CompletionInfo an = jshell.sourceCodeAnalysis().analyzeCompletion(content);
                    if (!an.completeness().isComplete()) {
                        break;
                    }
                    for(SnippetEvent e: jshell.eval(trimNewlines(an.source()))){
                        events.add(e);
                        // StringBuilder sb = new StringBuilder();
                        CommandOutput co = new CommandOutput();
                        co.setStatus(e.status().toString());
                        co.setCommand(e.snippet().source());
                        // switch (e.status()) {
                        //     case VALID:
                        //         sb.append("Successful, ");
                        //         break;
                        //     case RECOVERABLE_DEFINED:
                        //         sb.append("With unresolved references, ");
                        //         break;
                        //     case RECOVERABLE_NOT_DEFINED:
                        //         sb.append("Possibly reparable, failed,  ");
                        //         break;
                        //     case REJECTED:
                        //         sb.append("Failed, ");
                        //         break;
                        //     default:
                        //         sb.append("Error");
                        // }
                        // sb.append("The value of the expression is:");
                        try {
                            String rep = new String(baos.toByteArray(), "UTF-8");
                            // sb.append(rep);
                            co.setOutput(rep);
                            baos.reset();
                        }
                        catch (Exception ex){
                            ex.printStackTrace();
                        }
                        output.add(co);
                        // resultList.add(sb.toString());
                    }
                    if (an.remaining().isEmpty()) {
                        break;
                    }
                    content = an.remaining();
                }
            }
        }
        catch (Exception e){
            e.printStackTrace();
        }

        // resultList.add("Event list size:" + events.size());
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
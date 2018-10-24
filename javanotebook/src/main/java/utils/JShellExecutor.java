package utils;

import java.io.Console;
import java.io.IOException;
import java.io.ByteArrayInputStream;
import java.util.List;
import java.util.Objects;
import java.util.ArrayList;
import jdk.jshell.*;
import jdk.jshell.Snippet.Status;
import java.io.PrintStream;
import java.io.ByteArrayOutputStream;


public class JShellExecutor {

    private List<SnippetEvent> events;
    private List<String> resultList;
    private ByteArrayOutputStream baos = new ByteArrayOutputStream();
    
    public JShellExecutor(){
        resultList = new ArrayList<String>();
    }

    public List<String> evaluate(String command){

        try (PrintStream myOutStream = new PrintStream(baos, true, "UTF-8")) {
            try (JShell jshell = JShell.builder().out(myOutStream).build()){
                events = jshell.eval(command);
                for(SnippetEvent e : events){
                    StringBuilder sb = new StringBuilder();
                    switch (e.status()) {
                        case VALID:
                            sb.append("Successful, ");
                            break;
                        case RECOVERABLE_DEFINED:
                            sb.append("With unresolved references, ");
                            break;
                        case RECOVERABLE_NOT_DEFINED:
                            sb.append("Possibly reparable, failed,  ");
                            break;
                        case REJECTED:
                            sb.append("Failed, ");
                            break;
                        default:
                            sb.append("Error");
                    }
                    
                    sb.append("The value of the expression is:");
                    sb.append(e.value());
                    resultList.add(sb.toString());
                }
                resultList.add("Size of the snippet event list: " + events.size());
            }
        } catch (Exception e) {
            System.out.println(e);
        }
        
        try {
            String rep = new String(baos.toByteArray(), "UTF-8");
            ArrayList<String> list = new ArrayList<String>();
            list.add(rep);
            return list;
        } catch(Exception e){
            System.out.println(e);
        }
        return resultList;
    }

    public List<String> evaluate2(String input) {
        ArrayList<String> sb = new ArrayList<String>();
        try(JShell jshell = JShell.create()){
            // Handle snippet events. We can print value or take action if evaluation failed.
              jshell.onSnippetEvent(snippetEvent -> snippetEventHandler(snippetEvent, sb));
              String scriptContent = input;
              String s = scriptContent;
              while (true) {
                  // Read source line by line till semicolon (;)
                  SourceCodeAnalysis.CompletionInfo an = jshell.sourceCodeAnalysis().analyzeCompletion(s);
                  if (!an.completeness().isComplete()) {
                      break;
                  }
                  // If there are any method declaration or class declaration 
                  // in new lines, resolve it.
                  jshell.eval(trimNewlines(an.source()));
                  // EOF
                  if (an.remaining().isEmpty()) {
                      break;
                  }
                  // If there is semicolon, execute next seq
                  s = an.remaining();
              }
          } catch (Exception e) {
              e.printStackTrace();
          }
        return sb;
    }

    public void snippetEventHandler(SnippetEvent snippetEvent, ArrayList<String> sb){
        String value = snippetEvent.value();
        if(!Objects.isNull(value) && value.trim().length() > 0) {
          // Prints output of code evaluation
            // System.out.println(value);
            sb.add(value);
        }
        // If there are any erros print and exit
        if(Snippet.Status.REJECTED.equals(snippetEvent.status())){
            // System.out.println("Evaluation failed : "+snippetEvent.snippet().toString()
            //                     +"\nIgnoring execution of above script");
            sb.add("Evaluation failed : "+snippetEvent.snippet().toString()
                +"\nIgnoring execution of above script");
        }
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
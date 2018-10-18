package utils;

import java.io.Console;
import java.io.ByteArrayInputStream;
import java.util.List;
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
}
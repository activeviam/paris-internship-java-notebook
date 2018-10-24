package models;

import java.util.List;

public class JShellCommand {
    private final List<String> resultats;
    private final long id;
    private final String command;

    public JShellCommand(long id, List<String> resultats, String command){
        this.id = id;
        this.resultats = resultats;
        this.command = command;
    }
    public long getId(){
        return id;
    }

    public String getResultat(){
        String output = "";
        for(String s : resultats){
            output += s + "\n";
        }
        return output;
    }

    public String getCommand(){
        return this.command;
    }
}
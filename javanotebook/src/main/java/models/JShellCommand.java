package models;

import java.util.List;

public class JShellCommand {
    private final List<String> command;
    private final long id;

    public JShellCommand(long id, List<String> command){
        this.id = id;
        this.command = command;
    }
    public long getId(){
        return id;
    }

    public String getCommand(){
        String output = "";
        for(String s : command){
            output += s + "\n";
        }
        return output;
    }
}
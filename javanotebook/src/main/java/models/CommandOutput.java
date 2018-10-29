package models;

public class CommandOutput {
    private String command;
    private String status;
    private String output;

    public void setCommand(String command) { this.command = command; }
    public void setStatus(String status) { this.status = status; }
    public void setOutput(String output) { this.output = output; }

    public String getCommand(){ return command; }
    public String getStatus(){ return status; }
    public String getOutput(){ return output; }

}
package com.models;

public class CommandAndId {

    public String command;
    public Long id;

    public CommandAndId() {
        // Empty constructor needed for Jackson.
    }

    public void setCommand(String command){
        this.command = command;
    }

    public void setId(Long id){
        this.id = id;
    }

    public String getCommand() {
        return this.command;
    }

    public Long getId() {
        return this.id;
    }

}

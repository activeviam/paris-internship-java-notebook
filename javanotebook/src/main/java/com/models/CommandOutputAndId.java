package com.models;

import java.util.List;


public class CommandOutputAndId {
    private List<CommandOutput> output;
    private Long id;

    public void setOutput(List<CommandOutput> output) { this.output = output; }
    public void setId(Long id) { this.id = id; }

    public List<CommandOutput> getOutput(){ return output; }
    public Long getId(){ return this.id; }

}
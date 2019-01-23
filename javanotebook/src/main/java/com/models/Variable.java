package com.models;

public class Variable {
    private String typeName;
    private String name;

    public void setTypeName(String typeName) { this.typeName = typeName; }
    public void setName(String name) { this.name = name; }

    public String getTypeName() { return typeName; }
    public String getName() { return name; }

    public Variable(){}

    public Variable(String typeName, String name){
        this.typeName = typeName;
        this.name = name;
    }
    
}
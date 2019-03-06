package com.models;

public class Variable {
    private String typeName;
    private String name;
    private String value;

    public void setTypeName(String typeName) { this.typeName = typeName; }
    public void setName(String name) { this.name = name; }
    public void setValue(String value) { this.value = value; }

    public String getTypeName() { return this.typeName; }
    public String getName() { return this.name; }
    public String getValue() { return this.value; }

    public Variable(){}

    public Variable(String typeName, String name, String value){
        this.typeName = typeName;
        this.name = name;
        this.value = value;
    }
    
}
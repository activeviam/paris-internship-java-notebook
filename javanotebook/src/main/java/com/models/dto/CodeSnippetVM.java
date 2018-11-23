package com.models.dto;

public class CodeSnippetVM {

    private String content;
    private String name;

    public CodeSnippetVM() {
        // Empty constructor needed for Jackson.
    }

    public String getContent(){ return this.content; }
    public String getName(){ return this.name; }

    public void setContent(String content){ this.content = content;}
    public void setName(String name){ this.name = name;}
}
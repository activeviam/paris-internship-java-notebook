package com.models.dto;

import java.util.List;

public class NotebookVM {

    private String description;
    private String name;
    private List<String> codeSnippets;

    public NotebookVM() {
        // Empty constructor needed for Jackson.
    }

    public String getDescription(){ return this.description; }
    public String getName(){ return this.name; }
    public List<String> getCodeSnippet(){ return this.codeSnippets; }

    public void setDescription(String description){ this.description = description;}
    public void setName(String name){ this.name = name;}
    public void setCodeSnippets(List<String> codeSnippets){ this.codeSnippets = codeSnippets;}
}
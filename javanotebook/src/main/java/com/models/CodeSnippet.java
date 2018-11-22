package com.models;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "code_snippet")
public class CodeSnippet {

    @Id
    private Long id;

    private String content;
    private String name;

    public CodeSnippet() {
    }

    public CodeSnippet(String content, String name) {
        this.content = content;
        this.name = name;
    }

    public String getContent(){ return this.content; }
    public String getName(){ return this.name; }
    public Long getId(){ return this.id; }

    public void setContent(String content){ this.content = content;}
    public void setName(String name){ this.name = name;}
    public void setId(Long id){ this.id = id;}
}
package com.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "code_snippet")
public class CodeSnippet {

	/** The auto-generated id of the code snippet */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    /** The content of this code snippet */
    private String content;
    /** The name of this code snippet */
    private String name;

    /**
     * Empty constructor of {@link CodeSnippet}.
     */
    public CodeSnippet() {}

    /**
     * Constructor of {@link CodeSnippet}.
     *
     * @param content The content of the code snippet
     * @param name The name of the code snippet
     */
    public CodeSnippet(String content, String name) {
        this.content = content;
        this.name = name;
    }

    /**
     * Returns the content of the code snippet.
     *
     * @return the content of the code snippet.
     */
    public String getContent(){
    	return this.content;
    }

    /**
     * Returns the name of the code snippet
     *
     * @return the name of the code snippet
     */
    public String getName(){
    	return this.name;
    }

    /**
     * Returns the id of the code snippet
     *
     * @return the id of the code snippet
     */
    public Long getId(){
    	return this.id;
    }

    /**
     * Sets the content of the code snippet
     *
     * @param content the content of the code snippet
     */
    public void setContent(String content){
    	this.content = content;
    }

    /**
     * Sets the name of the code snippet
     *
     * @param name the name of the code snippet
     */
    public void setName(String name){
    	this.name = name;
    }

    /**
     * Sets the id of the code snippet
     *
     * @param id the id of the code snippet
     */
    public void setId(Long id){
    	this.id = id;
    }
}
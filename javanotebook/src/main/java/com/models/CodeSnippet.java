package com.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

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
    /** The position of this code snippet inside the notebook*/
    private Integer position;

    /** The notebook of this code snippet*/
    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "notebook_id")
    private Notebook notebook;

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


    public CodeSnippet(String content, String name, Notebook notebook, Integer position) {
        this.content = content;
        this.name = name;
        this.notebook = notebook;
        this.position = position;
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
     * Returns the position of the code snippet
     *
     * @return the position of the code snippet
     */
    public Integer getPosition(){
    	return this.position;
    }

    /**
     * Returns the notebook of the code snippet
     *
     * @return the notebook of the code snippet
     */
    public Notebook getNotebook(){
    	return this.notebook;
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

    /**
     * Sets the position of the code snippet
     *
     * @param position the position of the code snippet
     */
    public void setPosition(Integer position){
    	this.position = position;
    }

    /**
     * Sets the notebook of the code snippet
     *
     * @param notebook the notebook of the code snippet
     */
    public void setNotebook(Notebook notebook){
    	this.notebook = notebook;
    }
}
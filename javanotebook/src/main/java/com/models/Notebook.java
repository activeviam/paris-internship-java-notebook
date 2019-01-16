package com.models;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "notebook")
public class Notebook {

	/** The auto-generated id of the notebook */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    /** The description of this notebook */
    private String description;
    /** The name of this notebook */
    private String name;

    @JsonManagedReference
    @OneToMany(mappedBy = "notebook")
    private Set<CodeSnippet> codeSnippets = new HashSet<>();

    /**
     * Empty constructor of {@link Notebook}.
     */
    public Notebook() {}

    /**
     * Constructor of {@link Notebook}.
     *
     * @param description The description of the notebook
     * @param name The name of the notebook
     */
    public Notebook(String description, String name) {
        this.description = description;
        this.name = name;
    }

    /**
     * Returns the description of the notebook.
     *
     * @return the description of the notebook.
     */
    public String getDescription(){
    	return this.description;
    }

    /**
     * Returns the name of the notebook
     *
     * @return the name of the notebook
     */
    public String getName(){
    	return this.name;
    }

    /**
     * Returns the id of the notebook
     *
     * @return the id of the notebook
     */
    public Long getId(){
    	return this.id;
    }

    /**
     * Returns the code_snippets of the notebook
     *
     * @return the code_snippets of the notebook
     */
    public Set<CodeSnippet> getCodeSnippets(){
    	return this.codeSnippets;
    }

    /**
     * Sets the description of the notebook
     *
     * @param description the description of the notebook
     */
    public void setDescription(String description){
    	this.description = description;
    }

    /**
     * Sets the name of the notebook
     *
     * @param name the name of the notebook
     */
    public void setName(String name){
    	this.name = name;
    }

    /**
     * Sets the id of the notebook
     *
     * @param id the id of the notebook
     */
    public void setId(Long id){
    	this.id = id;
    }

    /**
     * Sets the codeSnippets of the notebook
     *
     * @param codeSnippets the codeSnippets of the notebook
     */
    public void setCodeSnippets(Set<CodeSnippet> codeSnippets){
    	this.codeSnippets = codeSnippets;
    }
}
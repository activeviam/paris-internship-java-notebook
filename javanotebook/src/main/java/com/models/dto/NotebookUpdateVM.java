package com.models.dto;

public class NotebookUpdateVM extends NotebookVM{

    private Long id;

    public NotebookUpdateVM() {
        super();
        // Empty constructor needed for Jackson.
    }

    public Long getId(){ return this.id; }

    public void setId(Long id){ this.id = id;}

}
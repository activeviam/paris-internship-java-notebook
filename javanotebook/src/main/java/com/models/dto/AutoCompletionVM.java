package com.models.dto;

import java.util.List;
import java.util.Set;

import com.models.Documentation;

public class AutoCompletionVM {

    private Set<String> suggestions;
    private List<Documentation> documentation;

    public AutoCompletionVM() {
        // Empty constructor needed for Jackson.
    }

    public Set<String> getSuggestions(){
        return this.suggestions;
    }

    public void setSuggestions(Set<String> suggestions) {
        this.suggestions = suggestions;
    }

    public List<Documentation> getDocumentation() {
        return this.documentation;
    }

    public void setDocumentation(List<Documentation> documentation) {
        this.documentation = documentation;
    }
}
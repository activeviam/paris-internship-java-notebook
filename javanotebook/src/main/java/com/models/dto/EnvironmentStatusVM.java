package com.models.dto;

import com.models.Variable;
import java.util.List;

public class EnvironmentStatusVM {

    private List<Variable> variables;
    private List<String> imports;

    public EnvironmentStatusVM() {
        // Empty constructor needed for Jackson
    }

    public List<Variable> getVariables() { return this.variables; }
    public List<String> getImports() { return this.imports; }

    public void setVariables(List<Variable> variables) {
        this.variables = variables;
    }

    public void setImports(List<String> imports) {
        this.imports = imports;
    }
}
package com.controllers;

import com.models.CommandOutput;
import com.models.Variable;
import com.models.Documentation;
import com.models.dto.AutoCompletionVM;
import com.models.dto.EnvironmentStatusVM;
import com.models.dto.ReceivedCommandVM;
import com.models.dto.ReceivedCommandsVM;
import com.models.CommandAndId;
import com.models.CommandOutputAndId;
import com.utils.JShellExecutor;
import com.services.JShellService;


import java.util.List;
import java.util.ArrayList;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class JShellCommandController {
    @Autowired
    JShellService jShellService;

    @PostMapping(value = "/api/jshellCommand")
    public List<CommandOutput> command(@RequestBody ReceivedCommandVM command){
        final JShellExecutor executor = jShellService.getJse(command.getId());
        final List<CommandOutput> output= executor.evaluateCommand(command.getCommand());
        return output;
    }

    @PostMapping(value = "/api/jshellCommands")
    public List<CommandOutputAndId> commands(@RequestBody ReceivedCommandsVM commands){
        System.out.println(commands.getCommands());
        System.out.println(commands.getNotebookId());

        final JShellExecutor executor = jShellService.getJse(commands.getNotebookId());
        final List<CommandOutputAndId> outputs = new ArrayList<CommandOutputAndId>();
        for (CommandAndId c : commands.getCommands()) {
            CommandOutputAndId output = new CommandOutputAndId();
            output.setOutput(executor.evaluateCommand(c.getCommand()));
            output.setId(c.getId());
            outputs.add(output);
        }
        return outputs;
    }

    @GetMapping(value="/api/codeAutoCompletion/{id}/{code}/{cursor}")
    public AutoCompletionVM autoComplete(@PathVariable("id") Long id, @PathVariable("code") String code, @PathVariable("cursor") long cursor){
        final JShellExecutor jse = jShellService.getJse(id);
        final Set<String> suggestions = jse.codeAutoCompletion(code, (int)cursor);
        final List<String> suggestionList = new ArrayList<>();
        suggestionList.addAll(suggestions);
        final List<Documentation> documentation = jse.generateJavaDoc(code, suggestionList);
        final AutoCompletionVM autoCompletionVM = new AutoCompletionVM();
        autoCompletionVM.setSuggestions(suggestions);
        autoCompletionVM.setDocumentation(documentation);
        return autoCompletionVM;
    }

    @GetMapping(value="/api/environmentStatus/{id}")
    public EnvironmentStatusVM getVariables(@PathVariable("id") Long id){
        final JShellExecutor jse = jShellService.getJse(id);
        final List<Variable> variables = jse.currentVariables();
        final List<String> imports = jse.currentImports();
        final EnvironmentStatusVM environmentStatusVm = new EnvironmentStatusVM();
        environmentStatusVm.setImports(imports);
        environmentStatusVm.setVariables(variables);
        return environmentStatusVm;
    }

    @PostMapping(value="/api/restartJshell/{id}")
    public void restart(@PathVariable("id") Long id){
        jShellService.restartJse(id);
    }
}
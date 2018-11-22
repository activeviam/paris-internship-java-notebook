package com.controllers;

import com.models.CodeSnippet;
import com.models.dto.CodeSnippetVM;
import com.repository.CodeSnippetRepository;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(path="/api/codeSnippet")
public class CodeSnippetController {

    private CodeSnippetRepository codeSnippetRepository;

	public CodeSnippetController(CodeSnippetRepository codeSnippetRepository){
         this.codeSnippetRepository = codeSnippetRepository;
	}

    @GetMapping(path="/all")
    public @ResponseBody Iterable<CodeSnippet> genresAll(){
        return codeSnippetRepository.findAll();
    }

    @PostMapping(path="/save")
    public @ResponseBody boolean command(@RequestBody CodeSnippetVM codeSnippetVM){
        CodeSnippet codeSnippet = new CodeSnippet(codeSnippetVM.getContent(), codeSnippetVM.getName());
        this.codeSnippetRepository.save(codeSnippet);
        return true;
    }

}
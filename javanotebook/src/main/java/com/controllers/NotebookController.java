package com.controllers;

import java.util.Iterator;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import com.models.CodeSnippet;
import com.models.Notebook;
import com.models.dto.CodeSnippetVM;
import com.models.dto.NotebookUpdateVM;
import com.models.dto.NotebookVM;
import com.repository.CodeSnippetRepository;
import com.repository.NotebookRepository;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(path="/api/notebook")
public class NotebookController {

    private NotebookRepository notebookRepository;
    private CodeSnippetRepository codeSnippetRepository;

	public NotebookController(NotebookRepository notebookRepository, CodeSnippetRepository codeSnippetRepository){
        this.notebookRepository = notebookRepository;
        this.codeSnippetRepository = codeSnippetRepository;
	}

    @GetMapping(path="/all")
    public @ResponseBody Iterable<Notebook> getAllNotebooks(){
        return notebookRepository.findAll();
    }

    /** Save a new notebook in the database, to update it see update method */
    @PostMapping(path="/save")
    public @ResponseBody boolean command(@RequestBody NotebookVM notebookVM) {
        // Notebook codeSnippet = new CodeSnippet(codeSnippetVM.getContent(), codeSnippetVM.getName());
        // this.notebookRepository.save(codeSnippet);
        Notebook notebook = new Notebook(notebookVM.getDescription(), notebookVM.getName());
        notebook = this.notebookRepository.save(notebook);
        List<String> codeSnippets = notebookVM.getCodeSnippet();
        for(Integer i = 0; i < codeSnippets.size(); i++) {
            String snippetName = notebook.getName() + "-" + i.toString();
            CodeSnippet codeSnippet = new CodeSnippet(codeSnippets.get(i), snippetName, notebook, i);
            this.codeSnippetRepository.save(codeSnippet);
        }

        return true;
    }

    /** Update a notebook in the database */
    @PostMapping(path="/update")
    public @ResponseBody boolean command(@RequestBody NotebookUpdateVM notebookVM) {
        // Notebook codeSnippet = new CodeSnippet(codeSnippetVM.getContent(), codeSnippetVM.getName());
        // this.notebookRepository.save(codeSnippet);

        Notebook notebook = this.notebookRepository.findById(notebookVM.getId()).get();
        if (notebook == null){
            return false;
        }
        Iterator<CodeSnippet> codeSnippets = notebook.getCodeSnippets().iterator();
        while(codeSnippets.hasNext()) {
            this.codeSnippetRepository.delete(codeSnippets.next());
        }
        notebook.setName(notebookVM.getName());
        notebook.setDescription(notebookVM.getDescription());
        notebook = this.notebookRepository.save(notebook);
        List<String> codeSnippetsVM = notebookVM.getCodeSnippet();
        for(Integer i = 0; i < codeSnippetsVM.size(); i++) {
            String snippetName = notebook.getName() + "-" + i.toString();
            CodeSnippet codeSnippet = new CodeSnippet(codeSnippetsVM.get(i), snippetName, notebook, i);
            this.codeSnippetRepository.save(codeSnippet);
        }

        return true;
    }

    @GetMapping(path="/id/{id}")
    public @ResponseBody Notebook getNotebookById(@PathVariable("id") long id) {
        Optional<Notebook> snippet = this.notebookRepository.findById(id);
        return snippet.get();

    }

}
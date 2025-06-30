package com.example.expensetracker.controllers;

import com.example.expensetracker.models.Expense;
import com.example.expensetracker.repositories.ExpenseRepository;
import com.example.expensetracker.services.ExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {

    @Autowired
    private ExpenseService expenseService;

    @GetMapping
    public List<Expense> getAllExpenses(){
        System.out.println("Hello from pod: " + System.getenv("HOSTNAME"));
        return expenseService.getAllExpenses();
    }

    @PostMapping
    public Expense addExpense(@RequestBody Expense expense){

        System.out.println("Hello from pod: " + System.getenv("HOSTNAME"));
        return expenseService.addExpense(expense);
    }

    @PutMapping("/{id}")
    public Expense updateExpense(@PathVariable String id, @RequestBody Expense expense) {
        System.out.println("Hello from pod: " + System.getenv("HOSTNAME"));
        return expenseService.editExpense(id, expense);
    }

    @DeleteMapping("/{id}")
    public void deleteExpense(@PathVariable String id) {

        System.out.println("Hello from pod: " + System.getenv("HOSTNAME"));
        expenseService.deleteExpense(id);
    }
}

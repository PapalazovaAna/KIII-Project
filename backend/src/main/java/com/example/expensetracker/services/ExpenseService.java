package com.example.expensetracker.services;

import com.example.expensetracker.models.Expense;
import com.example.expensetracker.repositories.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class ExpenseService {
    @Autowired
    private final ExpenseRepository expenseRepository;


    public ExpenseService(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }

    public List<Expense> getAllExpenses(){
        return expenseRepository.findAll();
    }

    public Expense addExpense(Expense expense){
        return expenseRepository.save(expense);
    }

    public Expense editExpense(String id, Expense updatedExpense) {
        Optional<Expense> optionalExpense = expenseRepository.findById(id);
        if (optionalExpense.isPresent()) {
            Expense existingExpense = optionalExpense.get();
            existingExpense.setTitle(updatedExpense.getTitle());
            existingExpense.setAmount(updatedExpense.getAmount());
            existingExpense.setCategory(updatedExpense.getCategory());
            existingExpense.setDate(updatedExpense.getDate());
            return expenseRepository.save(existingExpense);
        } else {
            throw new RuntimeException("Expense not found with id: " + id);
        }
    }

    public void deleteExpense(String id) {
        expenseRepository.deleteById(id);
    }
}

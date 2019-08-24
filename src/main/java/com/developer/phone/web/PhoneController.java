package com.developer.phone.web;

import com.developer.phone.domain.PhoneEntity;
import com.developer.phone.domain.PhoneEntityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.List;


@RestController
@RequestMapping(path = "/api")
public class PhoneController {

    @Autowired
    private PhoneEntityRepository repository;

    @GetMapping("entity/{id}")
    public PhoneEntity getPhoneEntity(@PathVariable Long id) {
        try {
            return repository.findById(id).get();
        } catch (Exception exc) {
            throw new IllegalArgumentException("phone with this id is not found: " + id);
        }
    }

    @GetMapping("entityLastName/{lastName}")
    public List<PhoneEntity> getPhoneEntityByName(@PathVariable String lastName) {

        return repository.findByLastName(lastName);

    }

    @PostMapping("/updateEntity")
    public PhoneEntity updateEntity(@Valid @RequestBody PhoneEntity phoneEntity) throws Exception {
        for (PhoneEntity d : repository.findAll()) {
            if (d.equals(phoneEntity)) {
                throw new IllegalArgumentException("Phone info already exists!");
            }
        }
        try {
            return repository.save(phoneEntity);
        } catch (Exception exc) {
            throw new IllegalArgumentException("Phone info could not be added!");
        }
    }

    @PutMapping("/editEntity/{id}")
    public PhoneEntity putDeadline(@RequestBody PhoneEntity phoneEntity, @PathVariable Long id) {
        if (phoneEntity.getId().equals(id)) {
            try {
                repository.findById(id).get();
            } catch (Exception exc) {
                throw new IllegalArgumentException("phone with this id is not found: " + id);
            }
            try {
                return repository.save(phoneEntity);
            } catch (Exception exc) {
                throw new IllegalArgumentException("phone could not be updated!");
            }
        } else {
            throw new IllegalArgumentException("Id does not match");
        }

    }

}

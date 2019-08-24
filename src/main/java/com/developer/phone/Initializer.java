package com.developer.phone;

import com.developer.phone.domain.PhoneEntity;
import com.developer.phone.domain.PhoneEntityRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class Initializer implements CommandLineRunner{

    private final PhoneEntityRepository repository;

    public Initializer(PhoneEntityRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... args) throws Exception {
        this.repository.save(new PhoneEntity("Nima", "Postanchi", "+48 74 743434"));
        this.repository.save(new PhoneEntity("Joni", "Dehaspe", "+47 10 743491"));
    }
}

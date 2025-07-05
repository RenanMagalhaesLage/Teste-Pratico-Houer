package com.testePratico.testePratico.controller;


import com.testePratico.testePratico.service.CsvService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/upload-csv")
@Tag(name = "CSV", description = "Endpoints para gerenciamento de CSVs")
public class CsvController {

    @Autowired
    private CsvService csvService;
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public String uploadCSV(@RequestParam("file") MultipartFile file) {
        return csvService.uploadCSV(file);
    }
}

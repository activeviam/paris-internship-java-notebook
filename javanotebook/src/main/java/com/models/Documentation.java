package com.models;

public class Documentation {
    public String signature;
    public String javaDoc;

    public Documentation() {
        // Empty constructor needed for Jackson.
    }

    public Documentation(String signature, String javaDoc){
        this.signature = signature;
        this.javaDoc = javaDoc;
    }

    public void setSignature(String signature){
        this.signature = signature;
    }

    public void setJavaDoc(String javaDoc) {
        this.javaDoc = javaDoc;
    }

    public String getSignature(){
        return this.signature;
    }

    public String getJavaDoc(){
        return this.javaDoc;
    }
}
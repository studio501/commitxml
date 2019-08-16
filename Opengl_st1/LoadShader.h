//
//  LoadShader.h
//  Opengl_st1
//
//  Created by 汤文 on 2019/8/11.
//  Copyright © 2019 汤文. All rights reserved.
//

#ifndef LoadShader_h
#define LoadShader_h

#include <string>
#include <fstream>
#include <sstream>
#include <iostream>
#include <GL/glew.h>


class Shader{
    
public:
    GLuint Program;
    Shader(const GLchar *vertexPath,const GLchar * fragmentPath){
        //1.retrieve the vertex/fragment source code from filePath
        std::string vertexCode;
        std::string fragmentCode;
        std::ifstream vShaderFile;
        std::ifstream fShaderFile;
        
        //ensure ifstream objects can throw exceptions;
        try {
            //open files
            vShaderFile.open(vertexPath);
            fShaderFile.open(fragmentPath);
            std::stringstream vShaderStream,fShaderStream;
            vShaderStream<<vShaderFile.rdbuf();
            fShaderStream<<fShaderFile.rdbuf();
            vShaderFile.close();
            fShaderFile.close();
            vertexCode = vShaderStream.str();
            fragmentCode = fShaderStream.str();
        } catch (std::ifstream::failure e) {
            std::cout<<"error::shader file"<<std::endl;
        }
        
        const GLchar *vShaderCode = vertexCode.c_str();
        const GLchar *fShaderCode = fragmentCode.c_str();
        
        //vertex shader
        GLuint vertex,fragment;
        GLint success;
        GLchar infoLog[512];
        vertex = glCreateShader(GL_VERTEX_SHADER);
        glShaderSource(vertex,1,&vShaderCode,NULL);
        glCompileShader(vertex);
        glGetShaderiv(vertex,GL_COMPILE_STATUS,&success);
        if(!success){
            glGetShaderInfoLog(vertex,512,NULL,infoLog);
            std::cout<<"error::shader::vertext::compile"<<infoLog<<std::endl;
        }
        
        //fragment shader
        fragment = glCreateShader(GL_FRAGMENT_SHADER);
        glShaderSource(fragment,1,&fShaderCode,NULL);
        glCompileShader(fragment);
        glGetShaderiv(fragment,GL_COMPILE_STATUS,&success);
        if(!success){
            glGetShaderInfoLog(fragment,512,NULL,infoLog);
            std::cout<<"error::fragment::compile"<<infoLog<<std::endl;
        }
        
        //shader program
        
        Program = glCreateProgram();
        glAttachShader(Program,vertex);
        glAttachShader(Program,fragment);
        glLinkProgram(Program);
        glGetProgramiv(Program,GL_LINK_STATUS,&success);
        if(!success){
            glGetProgramInfoLog(Program,512,NULL,infoLog);
            std::cout<<"error::shader::link"<<infoLog<<std::endl;
        }
        
        //delete
        glDeleteShader(vertex);
        glDeleteShader(fragment);
        
        
    }
    
    void Use(){
        glUseProgram(Program);
    }
    
    
};

#endif /* LoadShader_h */

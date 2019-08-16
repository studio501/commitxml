//
//  main.cpp
//  Opengl_st1
//
//  Created by 汤文 on 2019/8/11.
//  Copyright © 2019 汤文. All rights reserved.
//

#include <iostream>

//GLEW
#define GLEW_STATIC
#include <GL/glew.h>

//GLFW
#include <GLFW/glfw3.h>
#include "LoadShader.h"

#include "SOIL2/SOIL2.h"
#include <glm/glm.hpp>
#include <glm/gtc/matrix_transform.hpp>
#include <glm/gtc/type_ptr.hpp>

const GLint WIDTH = 800, HEIGHT = 600;





int main(int argc, const char * argv[]) {
    // insert code here...
    glfwInit();
    
    glfwWindowHint(GLFW_CONTEXT_VERSION_MAJOR, 3);
    glfwWindowHint(GLFW_CONTEXT_VERSION_MINOR, 3);
    glfwWindowHint(GLFW_OPENGL_PROFILE, GLFW_OPENGL_CORE_PROFILE);
    glfwWindowHint(GLFW_OPENGL_FORWARD_COMPAT, GL_TRUE);
    glfwWindowHint(GLFW_RESIZABLE, GL_FALSE);
    GLFWwindow * window = glfwCreateWindow(WIDTH, HEIGHT, "gl1", nullptr, nullptr);
    int screenWidth,screeenHeight;
    glfwGetFramebufferSize(window, &screenWidth, &screeenHeight);
    
    if(nullptr == window){
        std::cout<<"failed to create glfw window"<<std::endl;
        glfwTerminate();
        return -1;
    }
    
    glfwMakeContextCurrent(window);
    glewExperimental = GL_TRUE;
    
    if(GLEW_OK != glewInit()){
        std::cout<<"failed to initailize glew"<<std::endl;
        return -1;
    }
    
    glViewport(0, 0, screeenHeight, screeenHeight);
    
    Shader ourShader("res/shader/core.vs","res/shader/core.fs");
    //enable alpha
    glEnable(GL_BLEND);
    glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA);
    
    
    GLfloat vertices[] =
    {
        //positon               //color                 //texture coord
      0.5f,0.0f,0.0f,         1.0f,0.0f,0.0f,           1.0f,1.0f,//top right
        0.5f,-0.5f,0.0f,        1.0f,1.0f,1.0f,         1.0f,0.0f,//bottom right
        -0.5f,-0.0f,0.0f,         1.0f,0.0f,0.0f,       0.0f,0.0f,//bottom left
        -0.5f,0.5f,0.0f,         1.0f,1.0f,1.0f,       0.0f,1.0f//top left
    };
    
    GLuint indices[] =
    {
        0,1,3, //first triangle
        1,2,3 //second triangle
    };
    
    GLuint VBO,VAO,EBO;
    glGenVertexArrays(1,&VAO);
    glGenBuffers(1,&VBO);
    glGenBuffers(1,&EBO);
    
    glBindVertexArray(VAO);
    
    glBindBuffer(GL_ARRAY_BUFFER,VBO);
    glBufferData(GL_ARRAY_BUFFER,sizeof(vertices),vertices,GL_STATIC_DRAW);
    
    glBindBuffer(GL_ELEMENT_ARRAY_BUFFER,EBO);
    glBufferData(GL_ELEMENT_ARRAY_BUFFER,sizeof(indices),indices,GL_STATIC_DRAW);
    
    //position attribute
    glVertexAttribPointer(0,3,GL_FLOAT,GL_FALSE,8* sizeof(GL_FLOAT),(GLvoid *)0);
    glEnableVertexAttribArray(0);
    //color attribute
    glVertexAttribPointer(1,3,GL_FLOAT,GL_FALSE,8* sizeof(GL_FLOAT),(GLvoid *)(3*sizeof(GLfloat)));
    glEnableVertexAttribArray(1);
    //tex coord attribute
    glVertexAttribPointer(2,2,GL_FLOAT,GL_FALSE,8* sizeof(GL_FLOAT),(GLvoid *)(6*sizeof(GLfloat)));
    glEnableVertexAttribArray(2);
    
    //glBindBuffer(GL_ARRAY_BUFFER,0);
    glBindVertexArray(0);
    
    GLuint texture;
    int width,height;
    glGenTextures(1, &texture);
    glBindTexture(GL_TEXTURE_2D, texture);
    
    //set texture parameter
    glTexParameteri(GL_TEXTURE_2D,GL_TEXTURE_WRAP_S,GL_REPEAT);
    glTexParameteri(GL_TEXTURE_2D,GL_TEXTURE_WRAP_T,GL_REPEAT);
    glTexParameteri(GL_TEXTURE_2D,GL_TEXTURE_MIN_FILTER,GL_LINEAR);
    glTexParameteri(GL_TEXTURE_2D,GL_TEXTURE_MAG_FILTER,GL_LINEAR);
    
    unsigned char *image = SOIL_load_image("res/images/activity_ad_beiyong.png", &width, &height, 0, SOIL_LOAD_RGBA);
    glTexImage2D(GL_TEXTURE_2D, 0, GL_RGBA, width, height, 0, GL_RGBA, GL_UNSIGNED_BYTE, image);
    glGenerateMipmap(GL_TEXTURE_2D);
    SOIL_free_image_data(image);
    glBindTexture(GL_TEXTURE_2D, 0);
    
    while (!glfwWindowShouldClose(window)) {
        glfwPollEvents();
        glClearColor(0.2f, 0.3f, 0.3f, 1.0f);
        glClear(GL_COLOR_BUFFER_BIT);
        
//        glUseProgram(shaderProgram);
        ourShader.Use();
        
        glm::mat4 transform;
        transform = glm::translate(transform, glm::vec3(0.5f,0.5f,0.0f));
        transform = glm::rotate(transform, (GLfloat)glfwGetTime() * -5.0f, glm::vec3(0.0f,0.0f,1.0f));
        
        GLint transformLocation = glGetUniformLocation(ourShader.Program,"transform");
        glUniformMatrix4fv(transformLocation,1,GL_FALSE,glm::value_ptr(transform));
        
        glActiveTexture(GL_TEXTURE0);
        glBindTexture(GL_TEXTURE_2D, texture);
        glUniform1i(glGetUniformLocation(ourShader.Program,"ourTexture"),0);
        glBindVertexArray(VAO);
//        glDrawArrays(GL_TRIANGLES, 0, 3);
        glDrawElements(GL_TRIANGLES, 6, GL_UNSIGNED_INT, 0);
        glBindVertexArray(0);
        glfwSwapBuffers(window);
    }
    
    glDeleteVertexArrays(1,&VAO);
    glDeleteBuffers(1,&VBO);
    glDeleteBuffers(1,&EBO);
    glfwTerminate();
    return 0;
    
    
    return 0;
}

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


#include "Camera.h"

const GLint WIDTH = 800, HEIGHT = 600;
int SCREEN_WIDTH, SCREEN_HEIGHT;


#define USE_ORTH 0

// Function prototypes
void KeyCallback( GLFWwindow *window, int key, int scancode, int action, int mode );
void ScrollCallback( GLFWwindow *window, double xOffset, double yOffset );
void MouseCallback( GLFWwindow *window, double xPos, double yPos );
void DoMovement( );

// Camera
Camera  camera(glm::vec3( 0.0f, 0.0f, 3.0f ) );
GLfloat lastX = WIDTH / 2.0;
GLfloat lastY = HEIGHT / 2.0;
bool keys[1024];
bool firstMouse = true;

GLfloat deltaTime = 0.0f;
GLfloat lastFrame = 0.0f;


int main(int argc, const char * argv[]) {
    // insert code here...
    glfwInit();
    
    glfwWindowHint(GLFW_CONTEXT_VERSION_MAJOR, 3);
    glfwWindowHint(GLFW_CONTEXT_VERSION_MINOR, 3);
    glfwWindowHint(GLFW_OPENGL_PROFILE, GLFW_OPENGL_CORE_PROFILE);
    glfwWindowHint(GLFW_OPENGL_FORWARD_COMPAT, GL_TRUE);
    glfwWindowHint(GLFW_RESIZABLE, GL_FALSE);
    
    GLFWwindow * window = glfwCreateWindow(WIDTH, HEIGHT, "LearnOpenGL", nullptr, nullptr);
    if(nullptr == window){
        std::cout<<"failed to create glfw window"<<std::endl;
        glfwTerminate();
        return -1;
    }
    
    glfwMakeContextCurrent(window);
    
    int screenWidth,screeenHeight;
    glfwGetFramebufferSize(window, &SCREEN_WIDTH, &SCREEN_HEIGHT);
    
    // Set the required callback functions
    glfwSetKeyCallback( window, KeyCallback );
    glfwSetCursorPosCallback( window, MouseCallback );
    glfwSetScrollCallback( window, ScrollCallback );
    
    // Options, removes the mouse cursor for a more immersive experience
    glfwSetInputMode( window, GLFW_CURSOR, GLFW_CURSOR_DISABLED );
    
    
    glewExperimental = GL_TRUE;
    
    if(GLEW_OK != glewInit()){
        std::cout<<"failed to initailize glew"<<std::endl;
        return -1;
    }
    
    glViewport(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    
    glEnable(GL_DEPTH_TEST);
    
    glEnable(GL_BLEND);
    glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA);
    
#if USE_ORTH
    GLfloat vertices[] = {
        -0.5f * 500, -0.5f * 500, -0.5f * 500,  0.0f, 0.0f,
        0.5f * 500, -0.5f * 500, -0.5f * 500,  1.0f, 0.0f,
        0.5f * 500,  0.5f * 500, -0.5f * 500,  1.0f, 1.0f,
        0.5f * 500,  0.5f * 500, -0.5f * 500,  1.0f, 1.0f,
        -0.5f * 500,  0.5f * 500, -0.5f * 500,  0.0f, 1.0f,
        -0.5f * 500, -0.5f * 500, -0.5f * 500,  0.0f, 0.0f,
        
        -0.5f * 500, -0.5f * 500,  0.5f * 500,  0.0f, 0.0f,
        0.5f * 500, -0.5f * 500,  0.5f * 500,  1.0f, 0.0f,
        0.5f * 500,  0.5f * 500,  0.5f * 500,  1.0f, 1.0f,
        0.5f * 500,  0.5f * 500,  0.5f * 500,  1.0f, 1.0f,
        -0.5f * 500,  0.5f * 500,  0.5f * 500,  0.0f, 1.0f,
        -0.5f * 500, -0.5f * 500,  0.5f * 500,  0.0f, 0.0f,
        
        -0.5f * 500,  0.5f * 500,  0.5f * 500,  1.0f, 0.0f,
        -0.5f * 500,  0.5f * 500, -0.5f * 500,  1.0f, 1.0f,
        -0.5f * 500, -0.5f * 500, -0.5f * 500,  0.0f, 1.0f,
        -0.5f * 500, -0.5f * 500, -0.5f * 500,  0.0f, 1.0f,
        -0.5f * 500, -0.5f * 500,  0.5f * 500,  0.0f, 0.0f,
        -0.5f * 500,  0.5f * 500,  0.5f * 500,  1.0f, 0.0f,
        
        0.5f * 500,  0.5f * 500,  0.5f * 500,  1.0f, 0.0f,
        0.5f * 500,  0.5f * 500, -0.5f * 500,  1.0f, 1.0f,
        0.5f * 500, -0.5f * 500, -0.5f * 500,  0.0f, 1.0f,
        0.5f * 500, -0.5f * 500, -0.5f * 500,  0.0f, 1.0f,
        0.5f * 500, -0.5f * 500,  0.5f * 500,  0.0f, 0.0f,
        0.5f * 500,  0.5f * 500,  0.5f * 500,  1.0f, 0.0f,
        
        -0.5f * 500, -0.5f * 500, -0.5f * 500,  0.0f, 1.0f,
        0.5f * 500, -0.5f * 500, -0.5f * 500,  1.0f, 1.0f,
        0.5f * 500, -0.5f * 500,  0.5f * 500,  1.0f, 0.0f,
        0.5f * 500, -0.5f * 500,  0.5f * 500,  1.0f, 0.0f,
        -0.5f * 500, -0.5f * 500,  0.5f * 500,  0.0f, 0.0f,
        -0.5f * 500, -0.5f * 500, -0.5f * 500,  0.0f, 1.0f,
        
        -0.5f * 500,  0.5f * 500, -0.5f * 500,  0.0f, 1.0f,
        0.5f * 500,  0.5f * 500, -0.5f * 500,  1.0f, 1.0f,
        0.5f * 500,  0.5f * 500,  0.5f * 500,  1.0f, 0.0f,
        0.5f * 500,  0.5f * 500,  0.5f * 500,  1.0f, 0.0f,
        -0.5f * 500,  0.5f * 500,  0.5f * 500,  0.0f, 0.0f,
        -0.5f * 500,  0.5f * 500, -0.5f * 500,  0.0f, 1.0f
    };
#else
    GLfloat vertices[] = {
        -0.5f, -0.5f, -0.5f,  0.0f, 0.0f,
        0.5f, -0.5f, -0.5f,  1.0f, 0.0f,
        0.5f,  0.5f, -0.5f,  1.0f, 1.0f,
        0.5f,  0.5f, -0.5f,  1.0f, 1.0f,
        -0.5f,  0.5f, -0.5f,  0.0f, 1.0f,
        -0.5f, -0.5f, -0.5f,  0.0f, 0.0f,
        
        -0.5f, -0.5f,  0.5f,  0.0f, 0.0f,
        0.5f, -0.5f,  0.5f,  1.0f, 0.0f,
        0.5f,  0.5f,  0.5f,  1.0f, 1.0f,
        0.5f,  0.5f,  0.5f,  1.0f, 1.0f,
        -0.5f,  0.5f,  0.5f,  0.0f, 1.0f,
        -0.5f, -0.5f,  0.5f,  0.0f, 0.0f,
        
        -0.5f,  0.5f,  0.5f,  1.0f, 0.0f,
        -0.5f,  0.5f, -0.5f,  1.0f, 1.0f,
        -0.5f, -0.5f, -0.5f,  0.0f, 1.0f,
        -0.5f, -0.5f, -0.5f,  0.0f, 1.0f,
        -0.5f, -0.5f,  0.5f,  0.0f, 0.0f,
        -0.5f,  0.5f,  0.5f,  1.0f, 0.0f,
        
        0.5f,  0.5f,  0.5f,  1.0f, 0.0f,
        0.5f,  0.5f, -0.5f,  1.0f, 1.0f,
        0.5f, -0.5f, -0.5f,  0.0f, 1.0f,
        0.5f, -0.5f, -0.5f,  0.0f, 1.0f,
        0.5f, -0.5f,  0.5f,  0.0f, 0.0f,
        0.5f,  0.5f,  0.5f,  1.0f, 0.0f,
        
        -0.5f, -0.5f, -0.5f,  0.0f, 1.0f,
        0.5f, -0.5f, -0.5f,  1.0f, 1.0f,
        0.5f, -0.5f,  0.5f,  1.0f, 0.0f,
        0.5f, -0.5f,  0.5f,  1.0f, 0.0f,
        -0.5f, -0.5f,  0.5f,  0.0f, 0.0f,
        -0.5f, -0.5f, -0.5f,  0.0f, 1.0f,
        
        -0.5f,  0.5f, -0.5f,  0.0f, 1.0f,
        0.5f,  0.5f, -0.5f,  1.0f, 1.0f,
        0.5f,  0.5f,  0.5f,  1.0f, 0.0f,
        0.5f,  0.5f,  0.5f,  1.0f, 0.0f,
        -0.5f,  0.5f,  0.5f,  0.0f, 0.0f,
        -0.5f,  0.5f, -0.5f,  0.0f, 1.0f
    };
#endif
    
    glm::vec3 cubePositions[] =
    {
        glm::vec3( 0.0f, 0.0f, 0.0f ),
        glm::vec3( 2.0f, 5.0f, -15.0f ),
        glm::vec3( -1.5f, -2.2f, -2.5f ),
        glm::vec3( -3.8f, -2.0f, -12.3f ),
        glm::vec3( 2.4f, -0.4f, -3.5f ),
        glm::vec3( -1.7f, 3.0f, -7.5f ),
        glm::vec3( 1.3f, -2.0f, -2.5f ),
        glm::vec3( 1.5f, 2.0f, -2.5f ),
        glm::vec3( 1.5f, 0.2f, -1.5f ),
        glm::vec3( -1.3f, 1.0f, -1.5f )
    };
    
    Shader ourShader("res/shader/core.vs","res/shader/core.fs");
    //enable alpha
    
    
    GLuint VBO,VAO;
    glGenVertexArrays(1,&VAO);
    glGenBuffers(1,&VBO);
    
    glBindVertexArray(VAO);
    
    glBindBuffer(GL_ARRAY_BUFFER,VBO);
    glBufferData(GL_ARRAY_BUFFER,sizeof(vertices),vertices,GL_STATIC_DRAW);
    
    //position attribute
    glVertexAttribPointer(0,3,GL_FLOAT,GL_FALSE,5* sizeof(GL_FLOAT),(GLvoid *)0);
    glEnableVertexAttribArray(0);
    //tex coord attribute
    glVertexAttribPointer(2,2,GL_FLOAT,GL_FALSE,5* sizeof(GL_FLOAT),(GLvoid *)(3*sizeof(GLfloat)));
    glEnableVertexAttribArray(2);
    
    //glBindBuffer(GL_ARRAY_BUFFER,0);
    glBindVertexArray(0);
    
    GLuint texture;
    
    glGenTextures(1, &texture);
    glBindTexture(GL_TEXTURE_2D, texture);
    
    //set texture parameter
    glTexParameteri(GL_TEXTURE_2D,GL_TEXTURE_WRAP_S,GL_REPEAT);
    glTexParameteri(GL_TEXTURE_2D,GL_TEXTURE_WRAP_T,GL_REPEAT);
    glTexParameteri(GL_TEXTURE_2D,GL_TEXTURE_MIN_FILTER,GL_LINEAR);
    glTexParameteri(GL_TEXTURE_2D,GL_TEXTURE_MAG_FILTER,GL_LINEAR);
    
    int width,height;
    unsigned char *image = SOIL_load_image("res/images/57075_ad1_new.jpg", &width, &height, 0, SOIL_LOAD_RGBA);
    glTexImage2D(GL_TEXTURE_2D, 0, GL_RGBA, width, height, 0, GL_RGBA, GL_UNSIGNED_BYTE, image);
    glGenerateMipmap(GL_TEXTURE_2D);
    SOIL_free_image_data(image);
    glBindTexture(GL_TEXTURE_2D, 0);
    
//    glm::mat4 projection = glm::mat4(1.0);
//#if USE_ORTH
//    projection = glm::ortho(0.0f, ( GLfloat )screenWidth, 0.0f, ( GLfloat )screeenHeight, 0.1f, 1000.0f);
//#else
//    projection = glm::perspective(45.0f, GLfloat(SCREEN_WIDTH/SCREEN_HEIGHT), 0.1f, 100.0f);
//#endif
    
    while (!glfwWindowShouldClose(window)) {
        
        // Set frame time
        GLfloat currentFrame = glfwGetTime( );
        deltaTime = currentFrame - lastFrame;
        lastFrame = currentFrame;
        
        // Check and call events
        glfwPollEvents( );
        glClearColor(0.2f, 0.3f, 0.3f, 1.0f);
        glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
        DoMovement( );
        
        // Draw our first triangle
        ourShader.Use( );
        
        // Bind Textures using texture units
        glActiveTexture( GL_TEXTURE0 );
        glBindTexture( GL_TEXTURE_2D, texture );
        glUniform1i( glGetUniformLocation( ourShader.Program, "ourTexture1" ), 0 );
        
        glm::mat4 projection = glm::mat4(1.0);
        projection = glm::perspective(camera.GetZoom( ), (GLfloat)SCREEN_WIDTH/(GLfloat)SCREEN_HEIGHT, 0.1f, 1000.0f);
        
        // Create camera transformation
        glm::mat4 view = glm::mat4(1.0);
        view = camera.GetViewMatrix( );
        
        // Get the uniform locations
        GLint modelLoc = glGetUniformLocation( ourShader.Program, "model" );
        GLint viewLoc = glGetUniformLocation( ourShader.Program, "view" );
        GLint projLoc = glGetUniformLocation( ourShader.Program, "projection" );
        
        // Pass the matrices to the shader
        glUniformMatrix4fv( viewLoc, 1, GL_FALSE, glm::value_ptr( view ) );
        glUniformMatrix4fv( projLoc, 1, GL_FALSE, glm::value_ptr( projection ) );
        
        glBindVertexArray( VAO );
        
        for( GLuint i = 0; i < 10; i++ )
        {
            // Calculate the model matrix for each object and pass it to shader before drawing
            glm::mat4 model = glm::mat4(1.0);;
            model = glm::translate( model, cubePositions[i] );
            GLfloat angle = 20.0f * i;
            model = glm::rotate(model, angle, glm::vec3( 1.0f, 0.3f, 0.5f ) );
            glUniformMatrix4fv( modelLoc, 1, GL_FALSE, glm::value_ptr( model ) );
            
            glDrawArrays( GL_TRIANGLES, 0, 36 );
        }
        
        glBindVertexArray( 0 );
        // Swap the buffers
        glfwSwapBuffers( window );
    }
    
    // Properly de-allocate all resources once they've outlived their purpose
    glDeleteVertexArrays(1,&VAO);
    glDeleteBuffers(1,&VBO);
    glfwTerminate();
    return 0;
}

// Moves/alters the camera positions based on user input
void DoMovement( )
{
    // Camera controls
    if( keys[GLFW_KEY_W] || keys[GLFW_KEY_UP] )
    {
        camera.ProcessKeyboard( FORWARD, deltaTime );
    }
    
    if( keys[GLFW_KEY_S] || keys[GLFW_KEY_DOWN] )
    {
        camera.ProcessKeyboard( BACKWARD, deltaTime );
    }
    
    if( keys[GLFW_KEY_A] || keys[GLFW_KEY_LEFT] )
    {
        camera.ProcessKeyboard( LEFT, deltaTime );
    }
    
    if( keys[GLFW_KEY_D] || keys[GLFW_KEY_RIGHT] )
    {
        camera.ProcessKeyboard( RIGHT, deltaTime );
    }
}

// Is called whenever a key is pressed/released via GLFW
void KeyCallback( GLFWwindow *window, int key, int scancode, int action, int mode )
{
    if( key == GLFW_KEY_ESCAPE && action == GLFW_PRESS )
    {
        glfwSetWindowShouldClose(window, GL_TRUE);
    }
    
    if ( key >= 0 && key < 1024 )
    {
        if( action == GLFW_PRESS )
        {
            keys[key] = true;
        }
        else if( action == GLFW_RELEASE )
        {
            keys[key] = false;
        }
    }
}

void MouseCallback( GLFWwindow *window, double xPos, double yPos )
{
    if( firstMouse )
    {
        lastX = xPos;
        lastY = yPos;
        firstMouse = false;
    }
    
    GLfloat xOffset = xPos - lastX;
    GLfloat yOffset = lastY - yPos;  // Reversed since y-coordinates go from bottom to left
    
    lastX = xPos;
    lastY = yPos;
    
    camera.ProcessMouseMovement( xOffset, yOffset );
}


void ScrollCallback( GLFWwindow *window, double xOffset, double yOffset )
{
    camera.ProcessMouseScroll( yOffset );
}

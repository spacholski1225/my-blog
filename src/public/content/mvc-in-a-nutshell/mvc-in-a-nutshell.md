---
title: "MVC in a Nutshell"
date: "2021-03-21"
slug: "mvc-in-a-nutshell"
excerpt: "A brief introduction to the MVC architectural pattern and how its components—Model, Viewand Controller—work together."
thumbnail: "/images/mvc.png"
categories: ["Architecture"]
---

## What is MVC?

The MVC pattern (Model-View-Controller) is one of the most popular architectural patterns, which means it defines the structure of how an application is organized.

In simple terms, it divides an application into three main components: the model, the viewand the controller. These components work together to handle the overall system functionality.

![MVC Image](/images/mvc.png)

## How does MVC work?

To put it simply, a request is received by the appropriate controller, which then communicates with the model. The model manages the data and returns it to the controller. Once the controller has the necessary data, it sends it to the view, which then displays it to the user.

## What is what?

### Controller

The controller is responsible for the logic of the entire application. This is where calculations are made and decisions are taken based on user actions.

### Model

The model provides access to the data. It is typically responsible for communication with the database.

### View

The view is responsible for displaying data to the user.

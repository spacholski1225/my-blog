---
title: "Automating GitHub to S3 Sync with AWS CodeBuild for Bedrock Indexing"
date: "2024-05-18"
slug: "github-s3-sync-aws-codebuild-bedrock"
excerpt: "Learn how to automate the synchronization of a private GitHub repository to an S3 bucket for indexing with AWS Bedrock using AWS CodeBuild."
thumbnail: "/images/default-thumbnail.png"
categories: ["AWS", "Automation", "DevOps"]
---

# Automating GitHub to S3 Sync with AWS CodeBuild for Bedrock Indexing

Recently, one of my tasks was to create an automated synchronization of a private GitHub repository with an S3 bucket to later index the content using AWS Bedrock. TLDR: AWS CodeBuild turned out to be a much simpler solution than the initially considered Lambda.

## The Problem to Solve

I needed to create a mechanism that would:

* Daily fetch the content of a private GitHub repository
* Copy all files to an S3 bucket
* Enable later indexing of this content by AWS Bedrock
* Be simple to maintain and configure

Initially, I thought about AWS Lambda as a typical approach for this type of task, but I quickly discovered that this path involved many complications. Ultimately, CodeBuild proved to be a much better choice.

## Why NOT Lambda?

Although AWS Lambda works great in many scenarios, in this case, I encountered several significant issues:

* **Lack of Git tools in the Lambda environment** – Lambda does not include Git tools by default, so I would have to add these dependencies via Lambda Layers.
* **SSH connection problems** – authenticating to a private repository would require configuring SSH keys in Lambda, which adds another layer of complexity.
* **More code to write and maintain** – implementation in Lambda would require writing significantly more code to handle repository cloning, dependency management, etc.
* **Time limitations** – for larger repositories, there's a chance of exceeding Lambda's execution time limit.

## Why CodeBuild Was a Better Choice?

AWS CodeBuild turned out to be a much better solution for several reasons:

* **Ready-made environment with necessary tools** – CodeBuild includes Git, SSH, and other necessary development tools by default.
* **Simple configuration** – only a few lines in the `buildspec.yml` file were enough to define the entire process.
* **Easy integration with GitHub** – CodeBuild offers native integration with GitHub repositories.
* **SSH authentication support** – it's easy to configure access to private repositories.

## Implementation of the Solution

### 1. CodeBuild Project Configuration

The first step was to create a new project in AWS CodeBuild with the following settings:

* **Source**: No source (NO\_SOURCE) – because we will clone the repository directly in the buildspec.
* **Environment**: Amazon Linux 2
* **Service role**: A role with permissions to write to S3
* **Buildspec**: Inline buildspec

### 2. SSH Authentication Configuration

To access the private repository, I needed to configure SSH authentication:

* I generated an SSH key pair dedicated to CodeBuild.
* I added the public key to the GitHub repository settings.
* I saved the private key as a secret in AWS Secrets Manager.
* I configured CodeBuild to use this secret during the build.

### 3. Preparing the `buildspec.yml`

Here is a simple `buildspec.yml` file that performs the entire task in just a few steps:

```yaml
version: 0.2

phases:
  install:
    runtime-versions:
      python: 3.9
  pre_build:
    commands:
      # SSH configuration for GitHub
      - mkdir -p ~/.ssh
      - echo "$SSH_KEY" > ~/.ssh/id_rsa
      - chmod 600 ~/.ssh/id_rsa
      - ssh-keyscan github.com >> ~/.ssh/known_hosts
  build:
    commands:
      # Cloning the repository
      - git clone git@github.com:username/repository.git
      # Synchronizing with S3
      - aws s3 sync repository/ s3://my-bucket/repository/ --delete
  post_build:
    commands:
      # Removing the SSH key
      - rm -f ~/.ssh/id_rsa

artifacts:
  files:
    - appspec.yml
```

### 4. Trigger Configuration

Since the synchronization was to occur daily, I configured Amazon EventBridge to trigger the CodeBuild project daily. I also added a trigger from Amazon SNS so that the process could be manually started if needed.

## Conclusions

The CodeBuild solution turned out to be:

- *Much simpler to implement* – instead of writing dozens of lines of code in Lambda, I configured everything in a few lines of buildspec.
- *Easier to debug* – CodeBuild logs are more readable and provide better insight into the process.
- *More reliable* – I didn't have to worry about managing dependencies and the environment.
- *More flexible* – I can easily extend the process with additional steps if needed.

Although this was just a proof of concept, it shows that sometimes it's worth considering alternative AWS services, even if they initially seem less obvious for a given task.
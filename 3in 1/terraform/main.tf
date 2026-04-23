terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

# VPC for the application
resource "aws_vpc" "autonetops_vpc" {
  cidr_block = "10.0.0.0/16"
  tags = {
    Name = "AutoNetOps-VPC"
  }
}

# EKS Cluster
resource "aws_eks_cluster" "autonetops_cluster" {
  name     = "autonetops-cluster"
  role_arn = aws_iam_role.eks_cluster_role.arn

  vpc_config {
    subnet_ids = aws_subnet.private[*].id
  }
}

# IAM Role for EKS
resource "aws_iam_role" "eks_cluster_role" {
  name = "autonetops-eks-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "eks.amazonaws.com"
        }
      }
    ]
  })
}

# RDS for PostgreSQL
resource "aws_db_instance" "autonetops_db" {
  allocated_storage    = 20
  engine              = "postgres"
  engine_version      = "15.4"
  instance_class      = "db.t3.micro"
  db_name             = "autonetops"
  username            = "admin"
  password            = var.db_password
  parameter_group_name = "default.postgres15"
  skip_final_snapshot = true
}

# S3 for model storage
resource "aws_s3_bucket" "model_storage" {
  bucket = "autonetops-models-${random_id.bucket_suffix.hex}"
}

resource "random_id" "bucket_suffix" {
  byte_length = 4
}

# Variables
variable "db_password" {
  description = "Database password"
  type        = string
  sensitive   = true
}

# Outputs
output "eks_cluster_name" {
  value = aws_eks_cluster.autonetops_cluster.name
}

output "db_endpoint" {
  value = aws_db_instance.autonetops_db.endpoint
}

output "s3_bucket_name" {
  value = aws_s3_bucket.model_storage.bucket
}
import datetime
from django.db import models
from django.db.models.deletion import CASCADE

from datetime import date
from django.db import models

class User(models.Model):
    roll_no = models.CharField(max_length=200, unique=True)
    name = models.CharField(max_length=200)
    email = models.EmailField(max_length=254)
    gender = models.CharField(max_length=200,null=True)
    age = models.IntegerField(null=True) 
    degree = models.CharField(max_length=200,null=True)  
    uni = models.CharField(max_length=200,null=True)
    cgpa = models.DecimalField(max_digits=5, decimal_places=2,null=True) 
    device_dimensions= models.TextField(default="0x0")
    

class Question(models.Model):
    question = models.TextField(null=True)
    op1 = models.CharField(max_length=200, null=True)
    op2 = models.CharField(max_length=200, null=True)
    op3 = models.CharField(max_length=200, null=True)
    op4 = models.CharField(max_length=200, null=True)
    ans = models.CharField(max_length=200, null=True)
    actual_suggestion = models.TextField(null=True)
    misleading_suggestion = models.TextField(null=True)


class PromptedAnswers(models.Model):
    user = models.CharField(max_length=200, null=True)
    action = models.CharField(
        choices=[
            ("A", "A"),
            ("B", "B"),
            ("C", "C"),
            ("D", "D"),
            ("Start", "Start"),
            ("End", "End"),
            ("Prompt", "Prompt"),
            ("Continue", "Continue"),
        ],
        default="Null",
        max_length=10,
    )
    page = models.CharField(max_length=200, default="Null")
    time = models.TimeField(default="00:00:00")
    date = models.DateTimeField(("Date"), auto_now_add = True)
    


class UnpromptedAnswers(models.Model):
    user = models.CharField(max_length=200, null=True)
    action = models.CharField(
        choices=[
            ("A", "A"),
            ("B", "B"),
            ("C", "C"),
            ("D", "D"),
            ("Start", "Start"),
            ("End", "End"),
            ("Prompt", "Prompt"),
            ("Continue", "Continue"),
        ],
        default="Null",
        max_length=10,
    )
    page = models.CharField(max_length=200, default="Null")
    time = models.TimeField(default="00:00:00")
    date = models.DateTimeField(("Date"), auto_now_add = True)


class NoAssistanceAnswers(models.Model):
    user = models.CharField(max_length=200, null=True)
    action = models.CharField(
        choices=[
            ("A", "A"),
            ("B", "B"),
            ("C", "C"),
            ("D", "D"),
            ("Start", "Start"),
            ("End", "End"),
            ("Continue", "Continue"),
        ],
        default="Null",
        max_length=10,
    )
    page = models.CharField(max_length=200, default="Null")
    time = models.TimeField(default="00:00:00")
    date = models.DateTimeField(("Date"), auto_now_add = True)

class FeedbackForm(models.Model):
    
   
    questions = models.TextField(null=True)
    option1 = models.CharField(max_length=200, null=True)
    option2 = models.CharField(max_length=200, null=True)
    option3 = models.CharField(max_length=200, null=True)
    option4 = models.CharField(max_length=200, null=True)
    option5 = models.CharField(max_length=200, null=True)
        


    
   



class FeedbackANS(models.Model):
    UNPROMPTED = 1
    PROMPTED = 2
    NO_ASSISTANCE = 3

    SET_CHOICES = [
        (UNPROMPTED, "Unprompted"),
        (PROMPTED, "Prompted"),
        (NO_ASSISTANCE, "No Assistance"),
    ]
    user = models.CharField(max_length=200, null=True)
    action = models.CharField(
        choices=[
            ("A", "A"),
            ("B", "B"),
            ("C", "C"),
            ("D", "D"),
            ("E", "E"),
            ("Start", "Start"),
            ("End", "End"),
            ("Continue", "Continue"),
        ],
        default="Null",
        max_length=10,
    )
    set = models.IntegerField(choices=SET_CHOICES, default=UNPROMPTED)
    time = models.TimeField(default="00:00:00")
    date = models.DateTimeField(("Date"), auto_now_add = True)
    page = models.CharField(max_length=200, default="Null")


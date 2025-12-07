const express = require('express');
const router = express.Router();
const Language = require('../models/Language');
const ModuleContent = require('../models/ModuleContent');

// Get language data by name
router.get('/:name', async (req, res) => {
    try {
        const langName = req.params.name.toLowerCase();
        const language = await Language.findOne({ name: langName });

        if (!language) {
            // Try to find a default or return 404
            return res.status(404).json({ message: 'Language not found' });
        }

        res.json(language);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get specific module content
router.get('/:name/:module', async (req, res) => {
    try {
        const { name, module } = req.params;
        console.log(name, module);
        const contentDoc = await ModuleContent.findOne({
            language: name.toLowerCase(),
            type: module.toLowerCase()
        });

        if (!contentDoc) {
            return res.status(404).json({ message: `Content not found for ${module}` });
        }

        res.json(contentDoc.content);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create or Update a language
router.post('/', async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) return res.status(400).json({ message: "Name is required" });

        const lowercaseName = name.toLowerCase();

        // Update if exists, upsert: true options for findOneAndUpdate
        const updatedLanguage = await Language.findOneAndUpdate(
            { name: lowercaseName },
            { ...req.body, name: lowercaseName },
            { new: true, upsert: true } // Return new doc, create if not found
        );

        res.json(updatedLanguage);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Seed data (temporary helper)
router.post('/seed', async (req, res) => {
    try {
        console.log("SEEDING STARTED...");
        await Language.deleteMany({}); // Clear existing
        console.log("Old data deleted.");

        const seedData = [
            {
                name: "python",
                displayName: "Python",
                type: "Programming Language",
                title: "Practice Python Programming",
                subtitle: "Master the foundation of programming with comprehensive resources from basics to advanced concepts",
                stats: { modules: "7", topics: "100+", projects: "40+" },
                orbs: [
                    { color: "from-[#667eea] to-[#764ba2]", position: "-top-[10%] -left-[10%]", size: "w-[500px] h-[500px]", delay: "0s" },
                    { color: "from-[#f093fb] to-[#f5576c]", position: "top-[40%] -right-[10%]", size: "w-[400px] h-[400px]", delay: "8s" },
                    { color: "from-[#4facfe] to-[#00f2fe]", position: "-bottom-[10%] left-[30%]", size: "w-[350px] h-[350px]", delay: "16s" }
                ],
                cards: [
                    {
                        title: "Basics",
                        description: "Master Basic Concepts of Python Programming",
                        icon: "🔰",
                        color: "#667eea",
                        topics: ["Variables", "List", "Loops", "Functions"]
                    },
                    {
                        title: "Intermediate",
                        description: "Master Intermediate Concepts of Python Programming",
                        icon: "⚙️",
                        color: "#764ba2",
                        topics: ["OOP", "File Handling", "Exceptions", "Libraries"]
                    },
                    {
                        title: "Advanced",
                        description: "Master Advanced Concepts of Python Programming",
                        icon: "🚀",
                        color: "#f093fb",
                        topics: ["Machine Learning", "Web Scrapping", "APIs", "Deep Learning"]
                    },
                    {
                        title: "Practice Questions",
                        description: "Sharpen your logic with coding problems",
                        icon: "💻",
                        color: "#4facfe",
                        topics: ["Easy", "Medium", "Hard", "Expert"]
                    },
                    {
                        title: "Interview Questions",
                        description: "Prepare for placements with real questions",
                        icon: "🎯",
                        color: "#f5576c",
                        topics: ["FAQs", "Coding Tests", "Company-wise", "Tips"]
                    },
                    {
                        title: "Projects",
                        description: "Build practical projects to apply concepts",
                        icon: "🧩",
                        color: "#43e97b",
                        topics: ["Quiz Game", "Web Scrapper", "AI Chatbot"]
                    },
                    {
                        title: "Learning Roadmap",
                        description: "Follow a structured guide to master Python",
                        icon: "🛣️",
                        color: "#fa709a",
                        topics: ["Beginner", "Intermediate", "Advanced", "Expert"]
                    }
                ],
                contentBasics: [
                    {
                        id: "intro",
                        title: "Introduction to Python",
                        content: `Python is a high-level, interpreted, general-purpose programming language. It is known for its simple syntax, which makes it very easy to learn and read. Python is used by beginners and professionals all over the world in different areas of software development.

Why Python is Popular?

1. Easy to learn and read: Python's syntax is very similar to English, which makes it beginner-friendly.

2. Free and open-source: You can download and use Python for free.

3. Cross-platform: Works on Windows, Mac, and Linux.

4. Large community: There are millions of Python users worldwide, which makes finding help easy.

5. Versatile: Python can be used for web development, game development, data science, machine learning, automation, and more.

6. Powerful libraries: Python has many pre-built libraries that help in performing complex tasks quickly (like NumPy, Pandas, Matplotlib, TensorFlow, etc.).

Key Features of Python

1. Interpreted: Python executes code line by line, which helps in easier debugging.

2. High-level: You don't have to worry about the low-level details like memory management.

3. Object-Oriented: Python supports object-oriented programming, which helps in writing modular and reusable code.

4. Dynamically typed: You don't need to declare the type of a variable explicitly. Python figures it out automatically.

5. Extensible and Embeddable: Python can be integrated with other languages like C, C++, and Java.

Who Uses Python?

Some of the world's top companies use Python for their products and services:

1. Google – for search engines and AI projects
2. Netflix – for content recommendation systems
3. Instagram – for backend development
4. NASA – for scientific programming
5. Spotify – for data analysis and recommendation engines

Why Learn Python as a Beginner?

1. It is simple and easy to start coding immediately.
2. Great for learning programming concepts and logic.
3. Prepares you for advanced topics like AI, Machine Learning, and Web Development.
4. A great language for building real-world projects quickly.`
                    },
                    {
                        id: "installation",
                        title: "Installing Python",
                        content: `To start writing Python programs, you need to install Python on your computer. Follow these simple steps:

Steps:

1. Step 1: Go to the official Python website
Visit https://www.python.org/downloads/ to download Python.

2. Step 2: Download Python
- Look for the latest version of Python 3 (e.g., Python 3.12.x).
- Click the Download button for your operating system:
  • Windows: Click the Windows installer
  • Mac: Click the macOS installer
  • Linux: Follow instructions for your distribution

3. Step 3: Run the Installer

4. Step 4: Verify Installation
- Open Command Prompt (Windows), Terminal (Mac/Linux).
- Type the command:
    python --version

- You should see something like:
    Python 3.12.0
- If yes, Python is installed successfully!

Step 5: Install an IDE
You can also install a Python IDE for easier coding:
- VS Code: https://code.visualstudio.com/
- PyCharm: https://www.jetbrains.com/pycharm/

If you see a version number, installation is successful.`
                    },
                    {
                        id: "syntax",
                        title: "Python Syntax",
                        content: `
Python syntax is **simple and easy to read**, which is one of the reasons Python is so popular. Here’s everything you need to know to get started:

### 1. Python Statements
- Python code is written in **statements**, one per line.
- Example:
\`\`\`
x = 5
y = 10
print(x + y)
\`\`\`

### 2. Indentation
- Python uses **indentation (spaces)** instead of curly braces {} to define blocks of code.
- **All statements in the same block must be indented the same amount.**
- Example:
\`\`\`
if x > 0:
    print("Positive number")
else:
    print("Non-positive number")
\`\`\`
- Wrong indentation → **SyntaxError**

### 3. Case-Sensitivity
- Python is **case-sensitive**.
- Example:
\`\`\`
Name = "Amit"
name = "Ravi"
print(Name)  # Amit
print(name)  # Ravi
\`\`\`

### 4. Comments
- Comments are used to explain the code and are ignored by Python.
- **Single-line comment:**
\`\`\`
# This is a comment
\`\`\`
- **Multi-line comment:**
\`\`\`
"""
This is a
multi-line comment
"""
\`\`\`

### 5. Variables
- Variables **store data** and do not need explicit declaration.
- Example:
\`\`\`
age = 12
name = "Amit"
pi = 3.14
\`\`\`

### 6. Python is Dynamically Typed
- You don’t need to specify variable types. Python figures it out automatically.
- Example:
\`\`\`
x = 10       # int
y = 3.5      # float
name = "Amy" # str
\`\`\`

### 7. Python Statements on the Same Line
- You can write multiple statements in **one line** using a semicolon ";".
- Example:
\`\`\`
x = 5; y = 10; print(x + y)
\`\`\`

### 8. Python Indentation Best Practices
- Use **4 spaces per indent** (recommended by PEP8).
- Never mix tabs and spaces.
- Helps in **readable and maintainable code**.

### 9. First Python Program
\`\`\`
# Print Hello World
print("Hello, Python!")
\`\`\`

You are ready to move on to **variables, data types, and operators** next!
  `
                    },

                    {
                        id: "variables",
                        title: "Variables",
                        content: `
### What are Variables?
Variables are like **containers** that store data in a program.
You can store numbers, text, or any other type of information in them.

### Example
\`\`\`
name = "Amit"    # String
age = 10         # Integer
pi = 3.14        # Float
\`\`\`

### Rules for Naming Variables
1. **Cannot start with a number:**
   \`\`\`
   1name = "Amit"   # ❌ Wrong
   name1 = "Amit"   # ✅ Correct
   \`\`\`
2. **Case-sensitive:**
   \`\`\`
   Name = "Amit"
   name = "Ravi"
   print(Name)  # Amit
   print(name)  # Ravi
   \`\`\`
3. **Use meaningful names:**
   \`\`\`
   age = 12          # ✅ Good
   a = 12            # ❌ Not clear
   student_name = "Amit"  # ✅ Clear
   \`\`\`

### Tips
- Use **letters, numbers, and underscores (_)** in variable names.
- Avoid **special characters** like @, $, %, etc.
- Start variable names with a **letter or underscore**.

Now you can use variables to **store and manipulate data** in Python programs!`
                    },



                    {
                        id: "data-types",
                        title: "Data Types",
                        content: `
### What are Data Types?
A **data type** tells Python what kind of data is stored in a variable.
Python automatically figures out the type of data you give to a variable.

### Common Data Types in Python

1. **Integer (int)** – Whole numbers
\`\`\`
x = 10
y = -5
\`\`\`

2. **Float (float)** – Decimal numbers
\`\`\`
pi = 3.14
temperature = -2.5
\`\`\`

3. **String (str)** – Text enclosed in quotes
\`\`\`
name = "Amit"
greeting = 'Hello'
\`\`\`

4. **Boolean (bool)** – True or False values
\`\`\`
is_raining = True
is_sunny = False
\`\`\`

5. **List (list)** – A collection of items in order
\`\`\`
fruits = ["apple", "banana", "mango"]
numbers = [1, 2, 3, 4]
\`\`\`

6. **Tuple (tuple)** – Like a list, but **cannot be changed**
\`\`\`
colors = ("red", "green", "blue")
\`\`\`

7. **Set (set)** – A collection of **unique items**, no order
\`\`\`
unique_numbers = {1, 2, 3}
\`\`\`

8. **Dictionary (dict)** – Stores data as **key: value pairs**
\`\`\`
student = {
  "name": "Amit",
  "age": 12,
  "class": 7
}
\`\`\`

### How to Check Data Type
Use the **type()** function:
\`\`\`
x = 10
print(type(x))  # <class 'int'>
\`\`\`

### Tips
- Python automatically detects the type of a variable.
- You don’t need to **declare the type manually**.
- Choose the **right data type** for the task to make your program efficient.

Now you know the **main building blocks of data in Python**!`
                    },

                    {
                        id: "type-casting",
                        title: "Type Casting",
                        content: `
### What is Type Casting?
**Type Casting** means converting a variable from **one data type to another**.
This is useful when you need to perform operations between different data types.

### Common Type Casting Functions

1. **int()** – Converts a value to an integer
\`\`\`
x = int("5")    # string "5" → integer 5
y = int(3.9)    # float 3.9 → integer 3
\`\`\`

2. **float()** – Converts a value to a float (decimal number)
\`\`\`
x = float("3.14")  # string "3.14" → float 3.14
y = float(5)       # integer 5 → float 5.0
\`\`\`

3. **str()** – Converts a value to a string
\`\`\`
x = str(10)        # integer 10 → string "10"
y = str(3.5)       # float 3.5 → string "3.5"
\`\`\`

### Why Type Casting is Important
- To perform **mathematical operations** between numbers stored as strings.
- To display numbers as **text** in print statements.
- To avoid **errors** when combining different data types.

### Example: Using Type Casting
\`\`\`
num1 = "5"
num2 = 10

# Convert string to integer to add
sum = int(num1) + num2
print(sum)  # Output: 15

# Convert integer to string to print
print("The total is " + str(sum))  # Output: The total is 15
\`\`\`

### Tips
- Always convert **before performing operations**.
- Avoid converting incompatible types (e.g., "hello" → int will give an error).

Now you are ready to **take input and output values** in Python!`
                    },


                    {
                        id: "input-output",
                        title: "Input & Output",
                        content: `
### What is Input & Output?
- **Input** allows the user to give data to the program.
- **Output** displays information to the user.

---

### Taking Input from User
Use the **input()** function to take input.

\`\`\`
name = input("Enter your name: ")
age = input("Enter your age: ")
\`\`\`

- The program will **pause** and wait for the user to type something.
- Everything entered is stored as a **string**.

---

### Displaying Output
Use the **print()** function to show information.

\`\`\`
print("Hello", name)
print("You are", age, "years old")
\`\`\`

- You can print **text**, **numbers**, or both.
- Multiple items are separated by a **comma**, which adds a space automatically.

---

### Example: Input & Output Together
\`\`\`
# Take input
name = input("Enter your name: ")
age = input("Enter your age: ")

# Show output
print("Welcome", name)
print("Your age is", age)
\`\`\`

---

### Tips
- Convert input to other types if needed:
\`\`\`
age = int(input("Enter your age: "))  # converts input to integer
\`\`\`
- Use input and print together to make interactive programs.

Now you are ready to **use operators** to do calculations in Python!`
                    },


                    {
                        id: "operators",
                        title: "Operators",
                        content: `
### What are Operators?
Operators are symbols that tell Python to perform **specific operations** on values or variables, such as math calculations, comparisons, or logical checks.

---

### Types of Operators

1. **Arithmetic Operators** – for math operations
\`\`\`
+   # addition
-   # subtraction
*   # multiplication
/   # division
%   # modulo (remainder)
**  # exponent
//  # floor division
\`\`\`

2. **Comparison Operators** – for comparing values
\`\`\`
==  # equal to
!=  # not equal to
>   # greater than
<   # less than
>=  # greater or equal
<=  # less or equal
\`\`\`

3. **Logical Operators** – combine conditional statements
\`\`\`
and  # True if both are True
or   # True if at least one is True
not  # reverses True/False
\`\`\`

4. **Assignment Operators** – assign values to variables
\`\`\`
=   # simple assignment
+=  # add and assign
-=  # subtract and assign
*=  # multiply and assign
/=  # divide and assign
\`\`\`

5. **Membership Operators** – check if value exists in a sequence
\`\`\`
in       # True if exists
not in   # True if does NOT exist
\`\`\`

6. **Identity Operators** – check if two variables point to the same object
\`\`\`
is      # True if same object
is not  # True if not the same object
\`\`\`

---

### Example
\`\`\`
a = 10
b = 5

# Arithmetic
print(a + b)   # 15
print(a ** 2)  # 100

# Comparison
print(a > b)   # True

# Logical
print(a > 5 and b < 10)  # True

# Assignment
a += 5
print(a)  # 15
\`\`\`

---

### Tips
- Use operators carefully depending on the type of data (numbers, strings, lists).
- Logical operators help in making **conditions for decision-making**.
- Arithmetic and assignment operators are used **everywhere in Python programs**.

Now you are ready to explore **Strings in Python**!`
                    },



                    {
                        id: "strings",
                        title: "Strings",
                        content: `
### What are Strings?
Strings are **text** enclosed in **quotes**.
You can use **double quotes " "** or **single quotes ' '** to create a string.

---

### Example
\`\`\`
name = "Python"
greeting = 'Hello'
\`\`\`

---

### String Indexing
Each character in a string has a **position number (index)** starting from 0.
You can access characters using these indexes.

\`\`\`
text = "Hello"
print(text[0])   # H (first character)
print(text[1])   # e (second character)
print(text[-1])  # o (last character)
\`\`\`

---

### String Properties
- Strings are **immutable**, meaning you **cannot change a character directly**.
- Use **concatenation (+)** to join strings and **repetition (*)** to repeat them.

\`\`\`
text = "Hello"
new_text = text + " World"  # Concatenation
print(new_text)             # Hello World

repeat_text = text * 3
print(repeat_text)          # HelloHelloHello
\`\`\`

---

### Tips
- Use **single or double quotes** consistently.
- Remember: **index starts at 0**.
- To change a string, create a **new string** using operations or methods.

Now you are ready to explore **String Methods**!`
                    },



                    {
                        id: "string-methods",
                        title: "String Methods",
                        content: `
### What are String Methods?
String methods are **built-in functions** in Python that help you **work with text**.
You can modify, format, and process strings without writing complex code.

---

### Common String Methods

1. **upper()** – Converts string to uppercase
\`\`\`
text = "hello"
print(text.upper())  # HELLO
\`\`\`

2. **lower()** – Converts string to lowercase
\`\`\`
text = "HELLO"
print(text.lower())  # hello
\`\`\`

3. **strip()** – Removes spaces from the beginning and end
\`\`\`
text = "  Python  "
print(text.strip())  # Python
\`\`\`

4. **replace(old, new)** – Replaces old text with new text
\`\`\`
text = "Amit"
print(text.replace("A", "R"))  # Rmit
\`\`\`

5. **split()** – Splits string into a list by spaces or a separator
\`\`\`
text = "Hello World"
print(text.split())  # ['Hello', 'World']
\`\`\`

6. **join()** – Joins elements of a list into a string
\`\`\`
words = ['Hello', 'World']
print(" ".join(words))  # Hello World
\`\`\`

---

### Example
\`\`\`
name = "Amit"
print(name.lower())   # amit
print(name.upper())   # AMIT
\`\`\`

---

### Tips
- Methods **do not change the original string**; they return a **new string**.
- Use **help(str)** in Python to see all string methods.
- Combine methods for **powerful string manipulation**:
\`\`\`
text = "  Hello World  "
print(text.strip().upper())  # HELLO WORLD
\`\`\`

Now you are ready to explore **Lists in Python**!`
                    },



                    {
                        id: "lists",
                        title: "Lists",
                        content: `
### What are Lists?
Lists are used to **store multiple values** in a single variable.
You can store numbers, text, or even other lists inside a list.

---

### Creating a List
\`\`\`
fruits = ["apple", "mango", "banana"]
numbers = [1, 2, 3, 4]
mixed = [1, "apple", 3.5, True]
\`\`\`

---

### Features of Lists
- **Ordered** – items have a specific order (index starts from 0)
- **Changeable** – you can modify, add, or remove items
- **Allows duplicates** – same item can appear multiple times

---

### Accessing List Items
Use **indexing** to access items:
\`\`\`
fruits = ["apple", "mango", "banana"]
print(fruits[0])   # apple
print(fruits[2])   # banana
\`\`\`

- Negative index starts from the **end**:
\`\`\`
print(fruits[-1])  # banana
\`\`\`

---

### Example: Modifying a List
\`\`\`
fruits = ["apple", "mango", "banana"]

# Change an item
fruits[1] = "orange"

# Add an item
fruits.append("grapes")

# Remove an item
fruits.remove("apple")

print(fruits)  # ['orange', 'banana', 'grapes']
\`\`\`

---

### Tips
- Lists are **very flexible** and widely used in Python programs.
- Combine lists, slice them, or loop through items for powerful operations.

Next, we can do **List Methods** in the same polished, structured format.`
                    },


                    {
                        id: "list-methods",
                        title: "List Methods",
                        content: `
### What are List Methods?
List methods are **built-in functions** that help you **modify and work with lists** easily.

---

### Common List Methods

1. **append(item)** – Adds an item at the end of the list
\`\`\`
fruits = ["apple", "mango"]
fruits.append("banana")
print(fruits)  # ['apple', 'mango', 'banana']
\`\`\`

2. **insert(index, item)** – Adds an item at a specific position
\`\`\`
fruits.insert(1, "orange")
print(fruits)  # ['apple', 'orange', 'mango', 'banana']
\`\`\`

3. **remove(item)** – Removes the first occurrence of an item
\`\`\`
fruits.remove("mango")
print(fruits)  # ['apple', 'orange', 'banana']
\`\`\`

4. **pop()** – Removes and returns the last item
\`\`\`
last_fruit = fruits.pop()
print(last_fruit)  # banana
print(fruits)      # ['apple', 'orange']
\`\`\`

5. **sort()** – Sorts the list in ascending order
\`\`\`
nums = [3, 1, 2]
nums.sort()
print(nums)  # [1, 2, 3]
\`\`\`

6. **reverse()** – Reverses the order of the list
\`\`\`
nums.reverse()
print(nums)  # [3, 2, 1]
\`\`\`

---

### Tips
- Use **append()** to grow your list dynamically.
- Use **sort()** and **reverse()** for organizing data.
- Combine list methods to **perform powerful operations** easily.

Next, we can move on to **Tuples in Python** in the same polished format.`
                    },



                    {
                        id: "tuples",
                        title: "Tuples",
                        content: `
### What are Tuples?
Tuples are similar to lists, but they are **immutable**, which means once created, you **cannot change their items**.
They are often used to store data that should **not be modified**.

---

### Creating a Tuple
\`\`\`
colors = ("red", "green", "blue")
numbers = (1, 2, 3, 4)
mixed = (1, "apple", 3.5, True)
\`\`\`

- Use **parentheses ( )** to create tuples.
- Single-item tuple:
\`\`\`
single = ("apple",)
\`\`\`
*(Note the comma!)*

---

### Features of Tuples
- **Ordered** – items have a specific order (index starts from 0)
- **Unchangeable** – you cannot modify, add, or remove items
- **Faster than lists** – because they are immutable

---

### Accessing Tuple Items
\`\`\`
print(colors[0])   # red
print(colors[-1])  # blue
\`\`\`
`
                    }
                ],
                contentIntermediate: [
                    {
                        id: "advanced-data-types",
                        title: "Advanced Data Types",
                        content: `
### Advanced Python Collections
Python provides powerful built-in data structures that help you store, organize, and manipulate data efficiently.

---

## 1. **Lists**
- Ordered, mutable, allow duplicates
- Support slicing, indexing, nested lists
- Ideal for dynamic data

**Example:**
\`\`\`python
nums = [10, 20, 30, 40]
nums.append(50)
print(nums[1:4])      # [20, 30, 40]
nested = [[1,2], [3,4]]
print(nested[1][0])   # 3
\`\`\`

---

## 2. **Tuples**
- Ordered, immutable
- Faster than lists
- Great for fixed data

**Example:**
\`\`\`python
t = (1, 2, 3)
print(t[0])  # 1
new_t = t + (4, 5)
print(new_t)
\`\`\`

---

## 3. **Sets**
- Unordered, store unique elements
- Perfect for membership tests & removing duplicates

**Example:**
\`\`\`python
items = {1, 2, 3, 3, 2}
print(items)             # {1, 2, 3}
print(2 in items)        # True
items.add(5)
\`\`\`

---

## 4. **Dictionaries**
- Key–value pairs
- Keys must be unique & immutable
- Values can be anything

**Example:**
\`\`\`python
student = {"name": "Amit", "age": 21}
student["marks"] = 89
print(student["name"])
\`\`\`

---

### ✅ **DIY Questions**
1. Create a list of 5 numbers and print only even numbers using slicing or loops.
2. Convert a list with duplicates into a set without using set().
3. Create a dictionary to store product details (name, price, brand) and print each key-value pair.
`
                    },

                    {
                        id: "functions-intermediate",
                        title: "Functions (Intermediate)",
                        content: `
### Intermediate-Level Python Functions

---

## 1. **Default Arguments**
\`\`\`python
def greet(name="Guest"):
    print("Hello", name)

greet()
\`\`\`

---

## 2. **Keyword Arguments**
\`\`\`python
def show(name, age):
    print(name, age)

show(age=22, name="Amit")
\`\`\`

---

## 3. **Variable-Length Arguments**
### *args → multiple values (tuple)
### **kwargs → key-value pairs (dict)
\`\`\`python
def add(*nums):
    return sum(nums)

def info(**details):
    print(details)

info(name="Ravi", age=20)
\`\`\`

---

## 4. **Returning Multiple Values**
\`\`\`python
def operations(a, b):
    return a+b, a*b

s, p = operations(2, 3)
\`\`\`

---

## 5. **Nested Functions & Closures**
\`\`\`python
def outer():
    msg = "Hello"

    def inner():
        print(msg)

    return inner

func = outer()
func()
\`\`\`

---

### 🎯 DIY Questions
1. Write a function that accepts unlimited numbers and returns their average.
2. Create a function that returns two values: count of even numbers & odd numbers from a list.
3. Write a closure that stores a number and returns a function that multiplies any number with it.
`
                    },


                    {
                        id: "lambda-map-filter-reduce",
                        title: "Lambda, Map, Filter, Reduce",
                        content: `
### Functional Programming in Python

**Lambda Functions**
- Anonymous, small functions
\`\`\`
square = lambda x: x*x
print(square(5))  # 25
\`\`\`

**Map**
\`\`\`
nums = [1,2,3]
squared = list(map(lambda x: x*x, nums))
\`\`\`

**Filter**
\`\`\`
nums = [1,2,3,4]
even = list(filter(lambda x: x%2==0, nums))
\`\`\`

**Reduce** (from functools)
\`\`\`
from functools import reduce
nums = [1,2,3,4]
product = reduce(lambda x,y: x*y, nums)
\`\`\``
                    },

                    {
                        id: "modules-packages",
                        title: "Modules & Packages",
                        content: `
### Python Modules & Packages
1. **Built-in Modules**: math, random, os, sys, json
2. **Importing Modules**
\`\`\`
import math
print(math.sqrt(16))
\`\`\`
3. **Specific Function Import**
\`\`\`
from math import sqrt
print(sqrt(25))
\`\`\`
4. **Creating Your Own Module**
- Save functions/classes in .py
- Import in other scripts

5. **Packages**
- Directories containing multiple modules
- Use __init__.py to make a package`
                    },

                    {
                        id: "file-handling-intermediate",
                        title: "File Handling (Intermediate)",
                        content: `
### Advanced File Handling
1. **With Statement**
\`\`\`
with open("file.txt", "r") as f:
    content = f.read()
\`\`\`

2. **Reading Lines**
\`\`\`
lines = f.readlines()
\`\`\`

3. **Writing Multiple Lines**
\`\`\`
with open("file.txt", "w") as f:
    f.writelines(["Line1\\n", "Line2\\n"])
\`\`\`

4. **Working with CSV & JSON**
- Use **csv** module for CSV files
- Use **json** module for JSON parsing
\`\`\`
import json
data = json.load(open("data.json"))
\`\`\``
                    },

                    {
                        id: "exception-handling-intermediate",
                        title: "Exception Handling (Intermediate)",
                        content: `
### Advanced Exception Handling
1. **Multiple Except Blocks**
\`\`\`
try:
    x = int(input())
except ValueError:
    print("Invalid input")
except ZeroDivisionError:
    print("Division by zero")
\`\`\`

2. **Else Block**
- Executes if no exception occurs
\`\`\`
try:
    print(10/2)
except ZeroDivisionError:
    print("Error")
else:
    print("No error")
\`\`\`

3. **Custom Exceptions**
\`\`\`
class MyError(Exception):
    pass
raise MyError("Custom error occurred")
\`\`\``
                    },

                    {
                        id: "object-oriented-python",
                        title: "Object-Oriented Programming (OOP)",
                        content: `
### Python OOP Concepts
1. **Classes & Objects**
\`\`\`
class Person:
    def __init__(self, name):
        self.name = name
p = Person("Amit")
print(p.name)
\`\`\`

2. **Inheritance**
- Child class inherits parent class
\`\`\`
class Student(Person):
    pass
\`\`\`

3. **Polymorphism**
- Same interface, different implementation
4. **Encapsulation**
- Private attributes using __ prefix
5. **Class & Static Methods**
\`\`\`
class MyClass:
    @classmethod
    def cls_method(cls):
        pass
    @staticmethod
    def static_method():
        pass
\`\`\``
                    },

                    {
                        id: "iterators-generators",
                        title: "Iterators & Generators",
                        content: `
### Iterators & Generators
1. **Iterators**
- Objects you can loop over using iter() and next()
\`\`\`
nums = [1,2,3]
it = iter(nums)
print(next(it))  # 1
\`\`\`

2. **Generators**
- Functions that yield values one by one
\`\`\`
def gen():
    for i in range(3):
        yield i
for x in gen():
    print(x)
\`\`\`

3. **Generator Expressions**
\`\`\`
squared = (x*x for x in range(5))
\`\`\``
                    },

                    {
                        id: "decorators",
                        title: "Decorators",
                        content: `
### Python Decorators
Decorators **modify the behavior of a function** without changing its code.

---

**Basic Decorator**
\`\`\`
def decorator(func):
    def wrapper():
        print("Before")
        func()
        print("After")
    return wrapper

@decorator
def say_hello():
    print("Hello")
say_hello()
\`\`\`
- Used for **logging, timing, authentication**`
                    },

                    {
                        id: "context-managers",
                        title: "Context Managers",
                        content: `
### Python Context Managers
1. **Using with Statement**
- Automatically handles resource cleanup
\`\`\`
with open("file.txt", "r") as f:
    content = f.read()
\`\`\`

2. **Custom Context Manager**
\`\`\`
class MyCM:
    def __enter__(self):
        print("Enter")
    def __exit__(self, exc_type, exc_val, exc_tb):
        print("Exit")
with MyCM():
    print("Inside")
\`\`\``
                    },

                    {
                        id: "advanced-itertools-functools",
                        title: "Itertools & Functools",
                        content: `
### Useful Python Modules
1. **itertools**
- cycle(), count(), permutations(), combinations(), product()

2. **functools**
- reduce(), lru_cache(), partial()
\`\`\`
from itertools import permutations
print(list(permutations([1,2,3])))
\`\`\``
                    },

                    {
                        id: "multithreading-multiprocessing",
                        title: "Multithreading & Multiprocessing",
                        content: `
### Python Parallelism
1. **Threading**
\`\`\`
import threading
def func():
    print("Thread running")
t = threading.Thread(target=func)
t.start()
\`\`\`

2. **Multiprocessing**
\`\`\`
from multiprocessing import Process
def func():
    print("Process running")
p = Process(target=func)
p.start()
\`\`\`
- Threads share memory, processes do not`
                    }
                ],
                contentAdvanced: [
                    {
                        id: "metaclasses",
                        title: "Metaclasses",
                        content: `
### Python Metaclasses
- Define the behavior of classes
- Classes are instances of metaclasses

**Example:**
\`\`\`python
class Meta(type):
    def __new__(cls, name, bases, dct):
        print("Creating class", name)
        return super().__new__(cls, name, bases, dct)

class MyClass(metaclass=Meta):
    pass
\`\`\``
                    },
                    {
                        id: "descriptors",
                        title: "Descriptors",
                        content: `
### Descriptors
- Objects that manage attribute access
- Use __get__, __set__, __delete__

**Example:**
\`\`\`python
class Descriptor:
    def __get__(self, obj, objtype):
        return "Accessed"
    def __set__(self, obj, value):
        print("Set value:", value)

class MyClass:
    attr = Descriptor()

m = MyClass()
print(m.attr)
m.attr = 42
\`\`\``
                    },
                    {
                        id: "coroutines-async",
                        title: "Coroutines & Async",
                        content: `
### Asynchronous Programming
- Use async/await to write non-blocking code
- Ideal for I/O-bound tasks

**Example:**
\`\`\`python
import asyncio

async def say_hello():
    await asyncio.sleep(1)
    print("Hello")

asyncio.run(say_hello())
\`\`\``
                    },
                    {
                        id: "memory-management",
                        title: "Memory Management & Garbage Collection",
                        content: `
### Python Memory Management
- Python uses reference counting
- Garbage collector handles cyclic references

**Example:**
\`\`\`python
import gc

print(gc.isenabled())
gc.collect()
\`\`\``
                    },
                    {
                        id: "contextlib",
                        title: "Advanced Context Managers",
                        content: `
### contextlib Module
- Simplifies creation of context managers
- Use contextlib.contextmanager decorator

**Example:**
\`\`\`python
from contextlib import contextmanager

@contextmanager
def open_file(file):
    f = open(file)
    yield f
    f.close()

with open_file("test.txt") as f:
    print(f.read())
\`\`\``
                    },
                    {
                        id: "metaprogramming",
                        title: "Metaprogramming",
                        content: `
### Metaprogramming in Python
- Writing code that modifies code
- Commonly via decorators, metaclasses, or type()

**Example:**
\`\`\`python
def add_method(cls):
    cls.greet = lambda self: print("Hello")
    return cls

@add_method
class MyClass:
    pass

MyClass().greet()
\`\`\``
                    },
                    {
                        id: "destructors-finalizers",
                        title: "Destructors & Finalizers",
                        content: `
### Object Destruction
- __del__ method is called before object deletion
- Works with reference counting

**Example:**
\`\`\`python
class MyClass:
    def __del__(self):
        print("Object deleted")

obj = MyClass()
del obj
\`\`\``
                    },
                    {
                        id: "memory-profiling",
                        title: "Memory Profiling & Optimization",
                        content: `
### Optimizing Memory Usage
- Use sys.getsizeof() to check object size
- Use generators for large data
- Tools: memory_profiler, objgraph

**Example:**
\`\`\`python
import sys
nums = [i for i in range(1000)]
print(sys.getsizeof(nums))
\`\`\``
                    },
                    {
                        id: "advanced-iterators",
                        title: "Advanced Iterators & Itertools",
                        content: `
### Powerful Itertools
- Infinite iterators: cycle(), count()
- Combinatorics: permutations(), combinations(), product()

**Example:**
\`\`\`python
from itertools import combinations
items = [1,2,3]
print(list(combinations(items, 2)))  # [(1,2),(1,3),(2,3)]
\`\`\``
                    },
                    {
                        id: "profiling-debugging",
                        title: "Profiling & Debugging",
                        content: `
### Profiling & Debugging Tools
- Use cProfile, profile, and timeit for performance
- Use pdb for debugging

**Example:**
\`\`\`python
import cProfile

def func():
    sum(range(10000))

cProfile.run("func()")
\`\`\``
                    }
                ],
                contentPractice: [
                    {
                        id: 1,
                        title: "Print Hello World",
                        description: "Write a program that prints 'Hello World' to the console.",
                        difficulty: "Easy",
                        topics: ["Basic Syntax", "Output"],
                        Sample_Input: "Hello World",
                        Sample_Output: "Hello World",
                        solved: false,
                        successRate: "98%",
                        submissions: "15.2K"
                    },
                    {
                        id: 2,
                        title: "Add Two Numbers",
                        description: "Write a program that takes two integers as input and prints their sum.",
                        difficulty: "Easy",
                        topics: ["Variables", "Input", "Output", "Arithmetic Operators"],
                        Sample_Input: "5 7",
                        Sample_Output: "12",
                        solved: false,
                        successRate: "95%",
                        submissions: "12.5K"
                    },
                    {
                        id: 3,
                        title: "Check Even or Odd",
                        description: "Write a program that takes an integer as input and prints 'Even' if the number is even, otherwise prints 'Odd'.",
                        difficulty: "Easy",
                        topics: ["Conditional Statements", "Operators"],
                        Sample_Input: "8",
                        Sample_Output: "Even",
                        solved: false,
                        successRate: "93%",
                        submissions: "10.8K"
                    },
                    {
                        id: 4,
                        title: "Find Maximum of Three Numbers",
                        description: "Write a program that takes three integers as input and prints the maximum number.",
                        difficulty: "Easy",
                        topics: ["Conditional Statements", "Operators"],
                        Sample_Input: "4 9 7",
                        Sample_Output: "9",
                        solved: false,
                        successRate: "90%",
                        submissions: "9.5K"
                    }
                ],
                contentInterview: [
                    {
                        q: "What is Python?",
                        a: "Python is a high-level, interpreted, general-purpose programming language known for its simplicity and readability.",
                        difficulty: "Easy"
                    },
                    {
                        q: "Who developed Python?",
                        a: "Python was created by Guido van Rossum and first released in 1991.",
                        difficulty: "Easy"
                    },
                    {
                        q: "What are Python data types?",
                        a: "int, float, str, list, tuple, dict, set, bool, complex, and NoneType.",
                        category: "Data Types",
                        difficulty: "Easy"
                    },
                    {
                        q: "Difference between list and tuple?",
                        a: "Lists are mutable; tuples are immutable.",
                        category: "Data Types",
                        difficulty: "Easy"
                    }
                ],
                contentProjects: [
                    {
                        name: "Hello World Program",
                        description: "Start your Python journey by printing a simple 'Hello World' message.",
                        difficulty: "Easy",
                        icon: "👋",
                        tags: ["Python", "Basics"],
                        duration: "10 minutes"
                    },
                    {
                        name: "Simple Calculator",
                        description: "Create a calculator that performs addition, subtraction, multiplication, and division.",
                        difficulty: "Easy",
                        icon: "🧮",
                        tags: ["Python", "Arithmetic"],
                        duration: "1 day"
                    },
                    {
                        name: "Temperature Converter",
                        description: "Convert temperatures between Celsius, Fahrenheit, and Kelvin using basic input and output.",
                        difficulty: "Easy",
                        icon: "🌡️",
                        tags: ["Python", "Functions"],
                        duration: "1 day"
                    }
                ],
                contentRoadmap: [
                    {
                        title: "Basics",
                        link: "/languages/python/basics",
                        icon: "🔰",
                        duration: "2-3 weeks",
                        topics: 15,
                        description: "Variables, data types, control flow"
                    },
                    {
                        title: "Intermediate",
                        link: "/languages/python/intermediate",
                        icon: "⚙️",
                        duration: "3-4 weeks",
                        topics: 20,
                        description: "Functions, OOP, file handling"
                    },
                    {
                        title: "Advanced",
                        link: "/languages/python/advanced",
                        icon: "🚀",
                        duration: "4-5 weeks",
                        topics: 25,
                        description: "Decorators, generators, async"
                    }
                ]
            },
            {
                name: "java",
                displayName: "Java",
                type: "Programming Language",
                title: "Master Java Programming",
                subtitle: "Learn the most popular enterprise programming language from scratch to advanced concepts.",
                stats: { modules: "8", topics: "120+", projects: "50+" },
                orbs: [
                    { color: "from-blue-600 to-indigo-700", position: "-top-[10%] -left-[10%]", size: "w-[500px] h-[500px]", delay: "0s" },
                    { color: "from-cyan-400 to-blue-500", position: "top-[40%] -right-[10%]", size: "w-[400px] h-[400px]", delay: "8s" },
                    { color: "from-red-400 to-orange-500", position: "-bottom-[10%] left-[30%]", size: "w-[350px] h-[350px]", delay: "16s" }
                ],
                cards: [
                    {
                        title: "Basics",
                        description: "Master Basics of Java programming",
                        icon: "🔰",
                        color: "#667eea",
                        topics: ["OOP", "Loops", "Arrays", "Classes"]
                    },
                    {
                        title: "Intermediate",
                        description: "Master Intermediate concepts of Java programming",
                        icon: "⚙️",
                        color: "#764ba2",
                        topics: ["Collections", "Threads", "Exceptions Handling", "JDBC"]
                    },
                    {
                        title: "Advanced",
                        description: "Master Advanced topics of Java programming",
                        icon: "🚀",
                        color: "#f093fb",
                        topics: ["Spring Boot", "JPA", "Microservices", "Design Patterns"]
                    },
                    {
                        title: "Practice Questions",
                        description: "Sharpen your logic with coding problems",
                        icon: "💻",
                        color: "#4facfe",
                        topics: ["Easy", "Medium", "Hard", "Expert"]
                    },
                    {
                        title: "Interview Questions",
                        description: "Prepare for placements with real questions",
                        icon: "🎯",
                        color: "#f5576c",
                        topics: ["FAQs", "Coding Tests", "Company-wise", "Tips"]
                    },
                    {
                        title: "Projects",
                        description: "Build practical projects to apply concepts",
                        icon: "🧩",
                        color: "#43e97b",
                        topics: ["ATM Simulation", "Student Management System", "RESTful web service"]
                    },
                    {
                        title: "Learning Roadmap",
                        description: "Follow a structured guide to master Java",
                        icon: "🛣️",
                        color: "#fa709a",
                        topics: ["Beginner", "Intermediate", "Advanced", "Expert"]
                    },
                ]
            },
            {
                name: "javascript",
                displayName: "JavaScript",
                type: "Web Technology",
                title: "Master Modern JavaScript",
                subtitle: "The language of the web. Learn from basics to ES6+ features.",
                stats: { modules: "6", topics: "90+", projects: "30+" },
                orbs: [
                    { color: "from-yellow-300 to-orange-400", position: "-top-[10%] -left-[10%]", size: "w-[500px] h-[500px]", delay: "0s" },
                    { color: "from-yellow-400 to-yellow-600", position: "top-[40%] -right-[10%]", size: "w-[400px] h-[400px]", delay: "8s" },
                    { color: "from-orange-400 to-red-500", position: "-bottom-[10%] left-[30%]", size: "w-[350px] h-[350px]", delay: "16s" }
                ],
                cards: [
                    {
                        title: "Basics",
                        description: "Master Basics of JavaScript programming",
                        icon: "🔰",
                        color: "#667eea",
                        topics: ["Variables", "Loops", "Functions", "DOM Manipulation"]
                    },
                    {
                        title: "Intermediate",
                        description: "Master Intermediate concepts of JavaScript programming",
                        icon: "⚙️",
                        color: "#764ba2",
                        topics: ["promises", "Events", "Modules", "Fetch API"]
                    },
                    {
                        title: "Advanced",
                        description: "Master Advanced concepts of JavaScript programming",
                        icon: "🚀",
                        color: "#f093fb",
                        topics: ["React/vue", "Node.js", "WebSockets", "Performance Optimization"]
                    },
                    {
                        title: "Practice Questions",
                        description: "Sharpen your logic with coding problems",
                        icon: "💻",
                        color: "#4facfe",
                        topics: ["Easy", "Medium", "Hard", "Expert"]
                    },
                    {
                        title: "Interview Questions",
                        description: "Prepare for placements with real questions",
                        icon: "🎯",
                        color: "#f5576c",
                        topics: ["FAQs", "Coding Tests", "Company-wise", "Tips"]
                    },
                    {
                        title: "Projects",
                        description: "Build practical projects to apply concepts",
                        icon: "🧩",
                        color: "#43e97b",
                        topics: ["Quiz App", "Weather Dashboard", "Real-time chat app"]
                    },
                    {
                        title: "Learning Roadmap",
                        description: "Follow a structured guide to master JavaScript",
                        icon: "🛣️",
                        color: "#fa709a",
                        topics: ["Beginner", "Intermediate", "Advanced", "Expert"]
                    },
                ]
            }
        ];

        await ModuleContent.deleteMany({});
        console.log("Old Module Content deleted.");

        for (const lang of seedData) {
            // Extract heavy content fields
            const {
                contentBasics, contentIntermediate, contentAdvanced,
                contentPractice, contentInterview, contentProjects, contentRoadmap,
                ...langData
            } = lang;

            // Save Language Metadata
            await Language.create(langData);
            console.log(`Seeded Metadata for ${langData.name}`);

            // Prepare Module Data
            const modules = [
                { type: 'basics', content: contentBasics },
                { type: 'intermediate', content: contentIntermediate },
                { type: 'advanced', content: contentAdvanced },
                { type: 'practice', content: contentPractice },
                { type: 'interview', content: contentInterview },
                { type: 'projects', content: contentProjects },
                { type: 'roadmap', content: contentRoadmap }
            ];

            // Save Module Content
            for (const mod of modules) {
                if (mod.content && mod.content.length > 0) {
                    await ModuleContent.create({
                        language: langData.name,
                        type: mod.type,
                        content: mod.content
                    });
                    console.log(`Seeded ${mod.type} for ${langData.name}`);
                }
            }
        }

        res.json({ message: "Database seeded successfully with split schema!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;

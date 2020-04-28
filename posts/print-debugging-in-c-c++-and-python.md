<!--
.. title: Print debugging in C, C++ and Python
.. slug: print-debugging-in-c-c++-and-python
.. date: 2020-04-19 17:17:04 UTC+05:30
.. tags: c, c++, python, debugging
.. category:
.. link:
.. description:
.. type: text
-->

# Intro

Print debugging is key thing, whether it is in the begining of learning
or at a pro level programming.  C language is mainly
found [in](https://www.isical.ac.in/~pdslab/) [academia](https://cs50.harvard.edu/college/2020/spring/weeks/1/)
and in great project such as the linux kernel, git etc.
C++ is a top choice in competitive coding and Python is the language
used in servers, machine learning, AI and what not.

Print statements in Python and C++'s cout are easy to write statements
which help in debugging, but a little modification can improve the
experienece.

<!-- TEASER_END -->

# C-lang

Here is the macro:
```c
#define trace_format(x) \
    _Generic((x), \
    char: "[#%d]: %s = %c\n", \
    signed int: "[#%d]: %s = %d\n", \
    unsigned int: "[#%d]: %s = %u\n", \
    long int: "[#%d]: %s = %ld\n", \
    unsigned long int: "[#%d]: %s = %lu\n", \
    long long int: "[#%d]: %s = %lld\n", \
    unsigned long long int: "[#%d]: %s = %llu\n", \
    float: "[#%d]: %s = %f\n", \
    double: "[#%d]: %s = %f\n", \
    char *: "[#%d]: %s = %s\n", \
    void *: "[#%d]: %s = %p\n")
#define trace(Var) printf(trace_format(Var), __LINE__, (#Var), Var)
```

demo program:
```c
int main() {
    int value = 5;
    trace(value);
    return 0;
}
```

and the ouput:
```text
[#25]: value = 5
```

I have defined two macro's here `trace_format` and `format`. `trace_format` is
a helper macro, `trace` is the real thing.  Just use
`trace(<defined_variable_name>)`. It will output **line number** in square
brackets, followed by the **variable name** and its **value**.

Great things about this macro is that, we don't need to worry about the format
specifier, and we get the variable name also.

In some cases, we may need to nullify this `trace` macro. This can be achieved
by surrounding the existing macro with some lines.

```c
#define DEBUG
#ifdef DEBUG
#define trace_format(x) \
    _Generic((x), \
    char: "[#%d]: %s = %c\n", \
    signed int: "[#%d]: %s = %d\n", \
    unsigned int: "[#%d]: %s = %u\n", \
    long int: "[#%d]: %s = %ld\n", \
    unsigned long int: "[#%d]: %s = %lu\n", \
    long long int: "[#%d]: %s = %lld\n", \
    unsigned long long int: "[#%d]: %s = %llu\n", \
    float: "[#%d]: %s = %f\n", \
    double: "[#%d]: %s = %f\n", \
    char *: "[#%d]: %s = %s\n", \
    void *: "[#%d]: %s = %p\n")
#define trace(Var) printf(trace_format(Var), __LINE__, (#Var), Var)
#else
#define trace(Var) (void)(Var)
#endif
```

Now if we remove the `#define DEBUG` (first line) line of this code segment and any output
produced by `trace` macro will be nullified. Putting the line back will make the
macro work again. We can simply comment in and out the line.

The above trace macro is limited to the types defined in the macro.
Giving a unknown type to the macro will create errors. It is to note that
one can modify the macro or the typecast the variable to get around the problem.

# C++
I found this in a code submission on some competitive coding problem submission.
```cpp
#define trace(x) cerr << "[#" << __LINE__ << "] " << #x << " = " << (x) << '\n'
```
The output is in the same format as above.

# Python
Python3.8 has include f-string based debugging.

```python3
city = "Kolkata"
print(f"{city=}")
print(f"{city = }")
```

Outputs:
```
city='Kolkata'
city = 'Kolkata'
```

Here is a great
[post on f-string debugging](https://tirkarthi.github.io/programming/2019/05/08/f-string-debugging.html).


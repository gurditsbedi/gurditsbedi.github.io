<!--
.. title: A C Macro for debugging
.. slug: a-c-macro-for-debugging
.. date: 2020-04-04 19:30:48 UTC+05:30
.. tags: c, debugging
.. category:
.. link:
.. description:
.. type: text
-->
# Intro

C is a great language. It is taught in [many](https://cs50.harvard.edu/college/2020/spring/weeks/1/)
[colleges](https://www.isical.ac.in/~pdslab/)
worldwide and [online](https://www.coursera.org/courses?query=c%20programming).
Again it is still [quite
popular](https://web.archive.org/web/20200311090526/https://redmonk.com/sogrady/2020/02/28/language-rankings-1-20/).

Debugging is a key thing is programming. Leaving printf debugging aside,
gdb is a great debugger for c. It also has a nice active
[fronted](https://www.gdbgui.com/) being developed independently.
But sometimes we need a little more than printf.

<!-- TEASER_END -->

# Here is something,

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

# Bonus Tip

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

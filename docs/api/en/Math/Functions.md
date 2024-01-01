Javascript provides a built-in Math module with various functions. However, there is room for improvement in terms of efficiency. For instance, the Math.sqrt(x) function can calculate the square root of a number x, but it has limitations such as the inability to accept multiple parameters and the inability to map the function to different data types like Arrays and Objects.

In zikojs, I have addressed these limitations, providing a more versatile and efficient solution.

Example 
|zikojs|Vanilla js Equivalent|
|-|-|
|`sqrt(9)`|`sqrt(9)`|
|`sqrt(4,9,16)`|`[Math.sqrt(4),Math.sqrt(9),Math.sqrt(16)]`|
|`sqrt([4,9,16])`|`[Math.sqrt(4),Math.sqrt(9),Math.sqrt(16)]`|
|`sqrt([4,9],16)`|`[[Math.sqrt(4),Math.sqrt(9)],Math.sqrt(16)]`|
|`sqrt({x:4,y:9})`|`{x:sqrt(4),sqrt(9)}`|


Generally, zikojs allows you to input an infinite number of parameters, including deep arrays, objects, Maps, Sets, and more. The return value retains the input structure and calculates the result for each element accordingly.



|Functions|Description|
|-|-|
|`abs(...x)`||
|`pow(x,n)`||
|`sqrt(...x)`||
|`sqrtn(x,n)`||
|`e`||
|`ln`||
|`cos(...x)`||
|`sin(...x)`||
|`tan(...x)`||
|`sinc(...x)`||
|`acos(...x)`||
|`asin(...x)`||
|`atan(...x)`||
|`cosh(...x)`||
|`sinh(...x)`||
|`acosh(...x)`||
|`asinh(...x)`||
|`atanh(...x)`||
|`cot(...x)`||
|`sec(...x)`||
|`csc(...x)`||
|`acot(...x)`||
|`coth(...x)`||
|`acosh(...x)`||
|`asinh(...x)`||
|`atanh(...x)`||
|`atan2(x,y,?rad)`||
|`hypot(...x)`||
|`min(...x)`||
|`max(...x)`||
|`sign(...x)`||
|`sig(...x)`||
|`fact(...x)`||
|`round(...x)`||
|`floor(...x)`||
|`ceil(...x)`||

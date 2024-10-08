module.exports = {
    rules: {
      'no-invalid-dom-methods': {
        create(context) {
          // List of valid `document` method names
          const validMethods = [
            'createElement',
            'createAttribute',
            'createTextNode',
            'getElementById',
            'querySelector',
            // Add more DOM methods as needed
          ];
  
          return {
            MemberExpression(node) {
              const { object, property } = node;
  
              // Check if it's a method of `document`
              if (object.name === 'document') {
                const methodName = property.name;
  
                // Check if method is not in the validMethods array
                if (!validMethods.includes(methodName)) {
                  context.report({
                    node,
                    message: `'${methodName}' is not a valid DOM method. Did you mean '${getClosestMethodName(
                      methodName,
                      validMethods
                    )}'?`,
                  });
                }
              }
            },
          };
        },
      },
    },
  };
  
  // Helper function to suggest the closest valid method
  function getClosestMethodName(methodName, validMethods) {
    let closest = '';
    let minDistance = Infinity;
  
    for (const validMethod of validMethods) {
      const distance = levenshteinDistance(methodName, validMethod);
  
      if (distance < minDistance) {
        minDistance = distance;
        closest = validMethod;
      }
    }
  
    return closest;
  }
  
  // Levenshtein distance algorithm to calculate similarity between strings
  function levenshteinDistance(a, b) {
    const matrix = [];
  
    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }
  
    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }
  
    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1)
          );
        }
      }
    }
  
    return matrix[b.length][a.length];
  }
  
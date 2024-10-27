export function DefaultParams(defaults: Record<string, any>) {
    return function (
      target: any,
      propertyKey: string,
      descriptor: PropertyDescriptor
    ) {
      const originalMethod = descriptor.value;
  
      descriptor.value = function (...args: any[]) {
        const [options] = args;
        const mergedOptions = { ...defaults, ...options };
        return originalMethod.call(this, mergedOptions);
      };
  
      return descriptor;
    };
  }
  
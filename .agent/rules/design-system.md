---
trigger: always_on
---

# Design System Rules

## Modules system

1. **Folder Structure**: Modules must be organized in specific folders based on their responsibilities. For example:
    - `user.service.ts` should go to the `/services` folder.
    - `user.controller.ts` should go to the `/controllers` folder.
    - `user.module.ts` in the root of the module folder.
2. **Strict Typing**: All backend code must be strictly typed.
    - Avoid using `any` as much as possible.
    - Explicitly define the types of parameters, return values, and variables.
3. **Data Transfer Objects (DTOs)**:
    - Data transfer for creation, updating, or listing (e.g., endpoint payloads) must always use DTOs.
    - **Single File Rule**: DTO files must have only this responsibility. Create dedicated files (e.g., `create-user.dto.ts` inside a `/dtos` folder).
4. **SOLID Principles**: The architecture and code writing must strictly follow the SOLID principles:
    - **S**ingle Responsibility Principle: Each file, class, or function should have only one reason to change. (e.g., strictly separate DTOs, Services, Controllers, and Repositories).
    - **O**pen/Closed Principle: Code should be open for extension but closed for modification.
    - **L**iskov Substitution Principle: Derived classes must be substitutable for their base classes.
    - **I**nterface Segregation Principle: Create small, specific interfaces rather than general-purpose ones.
    - **D**ependency Inversion Principle: Design classes to depend on abstractions (interfaces/types) rather than concrete implementations, making good use of dependency injection.

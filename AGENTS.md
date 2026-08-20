# Veryfi SDK Agent Instructions

These instructions apply to any Veryfi SDK regardless of implementation
language (Kotlin, Java, PHP, Node.js, Python, C#, etc.). Apply the rules using
the conventions, tooling, and idioms of the SDK's language.

## Source of truth

The official Veryfi API documentation is:

https://docs.veryfi.com/

When working on API coverage, API methods, parameters, request handling,
or SDK functionality, the official documentation is the source of truth.

Do not assume the existing SDK represents the complete or current API.

Before implementing or changing an API method:

1. Find the corresponding endpoint in https://docs.veryfi.com/
2. Read the complete endpoint documentation.
3. Verify:
   - HTTP method
   - API path
   - path parameters
   - query parameters
   - request body parameters
   - required vs optional parameters
   - accepted file formats / request encoding
   - authentication requirements
   - response structure
   - async behavior
   - pagination behavior
   - examples and documented edge cases

## SDK implementation rules

- Preserve backward compatibility.
- Do not rename or remove existing public methods unless explicitly requested.
- Follow the architecture and conventions already used in this repository.
- Reuse the existing HTTP client and authentication implementation.
- Do not introduce another HTTP library.
- Add tests for every new endpoint.
- Add tests for newly supported parameters.
- Update the language's inline API documentation and type definitions/signatures
  where applicable (for example KDoc for Kotlin, Javadoc for Java, PHPDoc for
  PHP, JSDoc / TypeScript definitions for Node.js, docstrings/type hints for
  Python).
- Update README examples for newly exposed functionality.

## API coverage analysis

When asked to analyze API coverage:

Do not immediately implement code.

First compare the complete public Veryfi API documentation against this SDK.

Classify each API operation as:

- IMPLEMENTED
- PARTIAL
- MISSING
- UNCERTAIN

IMPLEMENTED means the SDK exposes the endpoint and supports the currently
documented parameters.

PARTIAL means the SDK exposes the endpoint but is missing documented
parameters, options, behavior, or response handling.

MISSING means no public SDK method exposes the operation.

UNCERTAIN means coverage cannot be proven from the repository and documentation.

Always include the documentation URL used to validate each endpoint.

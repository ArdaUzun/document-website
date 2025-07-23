---
title: 'API Reference'
author: 'arda'
---

## Overview

This document provides detailed API documentation for all services, models, and components in the Product Health Scanner application. Each section includes interface definitions, method signatures, and usage examples.

## Data Models

### ProductInfo

```typescript
interface ProductInfo {
  id: string;
  name: string;
  brand: string;
  barcode?: string;
  ingredients: string[];
  nutritionFacts: NutritionInfo;
  imageUrl?: string;
  lastUpdated: Date;
  dataSource: 'barcode' | 'image' | 'search';
  confidence: number;
}

interface NutritionInfo {
  servingSize: string;
  calories: number;
  totalFat: number;
  saturatedFat: number;
  transFat: number;
  cholesterol: number;
  sodium: number;
  totalCarbohydrates: number;
  dietaryFiber: number;
  totalSugars: number;
  addedSugars: number;
  protein: number;
}
```

### UserProfile

```typescript
interface UserProfile {
  id: string;
  allergies: Allergy[];
  dietaryRestrictions: DietaryRestriction[];
  healthConditions: HealthCondition[];
  preferences: UserPreferences;
  createdAt: Date;
  updatedAt: Date;
}

interface Allergy {
  id: string;
  name: string;
  severity: 'mild' | 'moderate' | 'severe' | 'life-threatening';
  triggers: string[];
}

interface DietaryRestriction {
  id: string;
  name: string;
  type: string;
}

interface HealthCondition {
  id: string;
  name: string;
  severity: 'mild' | 'moderate' | 'severe';
  type: string;
}

interface UserPreferences {
  language: string;
  units: 'metric' | 'imperial';
  notificationSettings: {
    healthWarnings: boolean;
    newRecommendations: boolean;
    productUpdates: boolean;
  };
  privacySettings: {
    shareAnalytics: boolean;
    shareHealthData: boolean;
    allowPersonalization: boolean;
  };
}
```

### HealthAnalysis

```typescript
interface HealthAnalysis {
  productId: string;
  overallSafety: 'safe' | 'caution' | 'warning' | 'danger';
  warnings: HealthWarning[];
  benefits: BeneficialIngredient[];
  recommendations: string[];
  confidence: number;
  analysisDate: Date;
  citations: Citation[];
}

interface HealthWarning {
  ingredient: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  reason: string;
  affectedConditions: string[];
  recommendation: string;
  sources: Citation[];
}

interface BeneficialIngredient {
  ingredient: string;
  benefits: string[];
  relevantConditions: string[];
  sources: Citation[];
}

interface Citation {
  id: string;
  title: string;
  source: string;
  credibilityScore: number;
}
```

## Services

### ProductIdentificationService

```typescript
interface IProductIdentificationService {
  identifyByBarcode(barcode: string): Promise<ProductInfo | null>;
  identifyByImage(imageData: Buffer): Promise<ProductInfo | null>;
  identifyBySearch(searchQuery: string): Promise<ProductInfo[] | null>;
}
```

#### identifyByBarcode

Identifies a product using its barcode by querying the Open Food Facts database.

**Parameters:**
- `barcode` (string): The product barcode

**Returns:**
- `Promise<ProductInfo | null>`: Product information or null if not found

**Example:**
```typescript
const product = await productIdentificationService.identifyByBarcode('0049000006587');
```

#### identifyByImage

Identifies a product using an image (conceptual implementation).

**Parameters:**
- `imageData` (Buffer): The image data

**Returns:**
- `Promise<ProductInfo | null>`: Product information or null

#### identifyBySearch

Searches for products by text query (conceptual implementation).

**Parameters:**
- `searchQuery` (string): The search query

**Returns:**
- `Promise<ProductInfo[] | null>`: Array of matching products or null

### HealthAnalysisService

```typescript
interface IHealthAnalysisService {
  analyzeIngredients(ingredients: string[], userProfile: UserProfile): Promise<HealthAnalysis | null>;
  generateWarnings(ingredients: string[], userProfile: UserProfile): Promise<HealthWarning[]>;
  findBeneficialIngredients(ingredients: string[], userProfile: UserProfile): Promise<BeneficialIngredient[]>;
  getCitations(ingredient: string, healthClaim: string): Promise<Citation[]>;
}
```

#### analyzeIngredients

Analyzes product ingredients against a user's health profile using AI.

**Parameters:**
- `ingredients` (string[]): Array of product ingredients
- `userProfile` (UserProfile): User's health profile

**Returns:**
- `Promise<HealthAnalysis | null>`: Health analysis results or null if analysis fails

**Example:**
```typescript
const analysis = await healthAnalysisService.analyzeIngredients(
  ['water', 'sugar', 'salt'], 
  userProfile
);
```

#### generateWarnings

Generates health warnings for ingredients based on user profile.

**Parameters:**
- `ingredients` (string[]): Array of product ingredients
- `userProfile` (UserProfile): User's health profile

**Returns:**
- `Promise<HealthWarning[]>`: Array of health warnings

#### findBeneficialIngredients

Identifies beneficial ingredients in a product for the user.

**Parameters:**
- `ingredients` (string[]): Array of product ingredients
- `userProfile` (UserProfile): User's health profile

**Returns:**
- `Promise<BeneficialIngredient[]>`: Array of beneficial ingredients

#### getCitations

Retrieves citations for health claims about ingredients.

**Parameters:**
- `ingredient` (string): The ingredient
- `healthClaim` (string): The health claim

**Returns:**
- `Promise<Citation[]>`: Array of citations

### ConversationalAIService

```typescript
interface IConversationalAIService {
  startProductDiscussion(productInfo: ProductInfo, userProfile: UserProfile): Promise<ChatSession>;
  suggestAlternatives(currentProduct: ProductInfo, userPreferences: UserPreferences): Promise<ProductRecommendation[]>;
  handleUserQuery(sessionId: string, query: string): Promise<ChatMessage>;
  maintainContext(sessionId: string): Promise<ChatSession>;
}
```

#### startProductDiscussion

Starts a new chat session about a product.

**Parameters:**
- `productInfo` (ProductInfo): The product to discuss
- `userProfile` (UserProfile): User's health profile

**Returns:**
- `Promise<ChatSession>`: The new chat session

#### suggestAlternatives

Suggests alternative products based on user preferences.

**Parameters:**
- `currentProduct` (ProductInfo): The current product
- `userPreferences` (UserPreferences): User's preferences

**Returns:**
- `Promise<ProductRecommendation[]>`: Array of product recommendations

#### handleUserQuery

Processes a user's chat query.

**Parameters:**
- `sessionId` (string): The chat session ID
- `query` (string): The user's query

**Returns:**
- `Promise<ChatMessage>`: The AI's response

#### maintainContext

Maintains the context of a chat session.

**Parameters:**
- `sessionId` (string): The chat session ID

**Returns:**
- `Promise<ChatSession>`: The updated chat session

### UserProfileService

```typescript
interface IUserProfileService {
  getUserProfile(userId: string): Promise<UserProfile | null>;
  createUserProfile(profile: UserProfile): Promise<UserProfile>;
  updateUserProfile(profile: UserProfile): Promise<UserProfile>;
  deleteUserProfile(userId: string): Promise<void>;
}
```

#### getUserProfile

Retrieves a user's profile.

**Parameters:**
- `userId` (string): The user ID

**Returns:**
- `Promise<UserProfile | null>`: The user profile or null if not found

#### createUserProfile

Creates a new user profile.

**Parameters:**
- `profile` (UserProfile): The profile to create

**Returns:**
- `Promise<UserProfile>`: The created profile

#### updateUserProfile

Updates an existing user profile.

**Parameters:**
- `profile` (UserProfile): The updated profile

**Returns:**
- `Promise<UserProfile>`: The updated profile

#### deleteUserProfile

Deletes a user profile.

**Parameters:**
- `userId` (string): The user ID

**Returns:**
- `Promise<void>`: Resolves when deletion is complete

### ScanHistoryService

```typescript
interface IScanHistoryService {
  getScanHistory(userId: string): Promise<ScanHistoryEntry[]>;
  addScan(product: ProductInfo, analysis: HealthAnalysis): Promise<ScanHistoryEntry>;
  getScanById(scanId: string): Promise<ScanHistoryEntry | null>;
  deleteScan(scanId: string): Promise<void>;
  clearHistory(userId: string): Promise<void>;
}
```

#### getScanHistory

Retrieves a user's scan history.

**Parameters:**
- `userId` (string): The user ID

**Returns:**
- `Promise<ScanHistoryEntry[]>`: Array of scan history entries

#### addScan

Adds a new scan to the history.

**Parameters:**
- `product` (ProductInfo): The scanned product
- `analysis` (HealthAnalysis): The health analysis

**Returns:**
- `Promise<ScanHistoryEntry>`: The new scan history entry

#### getScanById

Retrieves a specific scan by ID.

**Parameters:**
- `scanId` (string): The scan ID

**Returns:**
- `Promise<ScanHistoryEntry | null>`: The scan entry or null if not found

#### deleteScan

Deletes a scan from history.

**Parameters:**
- `scanId` (string): The scan ID

**Returns:**
- `Promise<void>`: Resolves when deletion is complete

#### clearHistory

Clears all scan history for a user.

**Parameters:**
- `userId` (string): The user ID

**Returns:**
- `Promise<void>`: Resolves when clearing is complete

## Components

### ErrorDisplay

```typescript
interface ErrorDisplayProps {
  error: ErrorResponse;
  onRetry?: () => void;
}
```

Displays error messages to the user with optional retry functionality.

### HealthWarningDisplay

```typescript
interface HealthWarningDisplayProps {
  analysis: HealthAnalysis;
}
```

Displays health analysis results including warnings, benefits, and recommendations.

### LoadingIndicator

```typescript
interface LoadingIndicatorProps {
  message?: string;
}
```

Shows a loading spinner with an optional message.

### ProductDisplay

```typescript
interface ProductDisplayProps {
  product: ProductInfo;
}
```

Displays detailed information about a product.

## Utilities

### ErrorHandling

```typescript
interface ErrorResponse {
  code: string;
  message: string;
  severity: 'info' | 'warning' | 'error' | 'critical';
  fallbackAction?: string;
  retryable: boolean;
}

function retry<T>(fn: () => Promise<T>, maxRetries?: number, delay?: number): Promise<T>;
function createErrorResponse(code: string, message: string, severity: string, fallbackAction?: string, retryable?: boolean): ErrorResponse;
```

## Environment Variables

The application uses the following environment variables:

- `OPENAI_API_KEY`: API key for OpenAI services

## External APIs

### Open Food Facts API

Used for product identification by barcode:
- Endpoint: `https://world.openfoodfacts.org/api/v0/product/{barcode}.json`
- Documentation: https://world.openfoodfacts.org/data

### OpenAI API

Used for health analysis and conversational AI:
- Models: GPT-4
- Documentation: https://platform.openai.com/docs

## Future API Expansions

Planned API enhancements include:

1. **Additional Data Sources**:
   - Integration with more product databases
   - Additional health research databases

2. **Enhanced AI Capabilities**:
   - Multi-modal analysis for image and text
   - Real-time personalization APIs

3. **Analytics and Monitoring**:
   - Usage analytics APIs
   - Performance monitoring endpoints

4. **User Management**:
   - Authentication APIs
   - User preference synchronization
---
title: 'Data Models'
author: 'arda'
---

## Overview

The Product Health Scanner application uses a set of well-defined data models to represent core entities in the system. These models are implemented as TypeScript classes that provide both data structure and business logic.

## Model Structure

```
src/
├── models/
│   ├── HealthAnalysis.ts
│   ├── ProductInfo.ts
│   ├── UserProfile.ts
│   └── index.ts
```

## ProductInfoModel

The `ProductInfoModel` represents a food product with all its relevant information.

### Properties

```typescript
class ProductInfoModel {
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
```

### Methods

- `isValid(): boolean` - Checks if the product has essential information
- `hasNutritionInfo(): boolean` - Determines if nutrition information is available
- `getConfidenceLevel(): 'low' | 'medium' | 'high'` - Returns a human-readable confidence level

### Related Types

```typescript
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

## UserProfileModel

The `UserProfileModel` represents a user's health profile, including allergies, dietary restrictions, and health conditions.

### Properties

```typescript
class UserProfileModel {
  id: string;
  allergies: Allergy[];
  dietaryRestrictions: DietaryRestriction[];
  healthConditions: HealthCondition[];
  preferences: UserPreferences;
  createdAt: Date;
  updatedAt: Date;
}
```

### Methods

- `addAllergy(allergy: Allergy): void` - Adds or updates an allergy
- `removeAllergy(allergyId: string): void` - Removes an allergy by ID
- `addDietaryRestriction(restriction: DietaryRestriction): void` - Adds or updates a dietary restriction
- `removeDietaryRestriction(restrictionId: string): void` - Removes a dietary restriction by ID
- `addHealthCondition(condition: HealthCondition): void` - Adds or updates a health condition
- `removeHealthCondition(conditionId: string): void` - Removes a health condition by ID
- `updatePreferences(preferences: Partial<UserPreferences>): void` - Updates user preferences
- `hasAllergies(): boolean` - Checks if the user has any allergies
- `hasDietaryRestrictions(): boolean` - Checks if the user has any dietary restrictions
- `hasHealthConditions(): boolean` - Checks if the user has any health conditions
- `getSevereAllergies(): Allergy[]` - Returns only severe allergies

### Related Types

```typescript
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

## HealthAnalysisModel

The `HealthAnalysisModel` represents the results of analyzing a product's ingredients against a user's health profile.

### Properties

```typescript
class HealthAnalysisModel {
  productId: string;
  overallSafety: 'safe' | 'caution' | 'warning' | 'danger';
  warnings: HealthWarning[];
  benefits: BeneficialIngredient[];
  recommendations: string[];
  confidence: number;
  analysisDate: Date;
  citations: Citation[];
}
```

### Methods

- `hasWarnings(): boolean` - Checks if there are any warnings
- `hasBenefits(): boolean` - Checks if there are any beneficial ingredients
- `getCriticalWarnings(): HealthWarning[]` - Returns critical severity warnings
- `getHighWarnings(): HealthWarning[]` - Returns high severity warnings
- `getMediumWarnings(): HealthWarning[]` - Returns medium severity warnings
- `getLowWarnings(): HealthWarning[]` - Returns low severity warnings
- `getWarningsByCondition(condition: string): HealthWarning[]` - Returns warnings related to a specific condition
- `getBenefitsByCondition(condition: string): BeneficialIngredient[]` - Returns benefits related to a specific condition
- `getOverallRiskLevel(): number` - Calculates a weighted risk score
- `isRecommendedForUser(): boolean` - Determines if the product is recommended
- `getSummary(): string` - Provides a human-readable summary
- `addWarning(warning: HealthWarning): void` - Adds a warning to the analysis
- `addBenefit(benefit: BeneficialIngredient): void` - Adds a benefit to the analysis
- `addRecommendation(recommendation: string): void` - Adds a recommendation

### Related Types

```typescript
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

## Model Validation

All models include validation logic to ensure data integrity:
- Required fields are checked during instantiation
- Data types are enforced through TypeScript
- Business logic validation is implemented in model methods

## Future Enhancements

Planned improvements for the data models include:

1. **Additional Validation**:
   - More comprehensive validation rules
   - Integration with validation libraries like Joi or Yup

2. **Data Persistence**:
   - Better serialization/deserialization methods
   - Integration with ORM libraries

3. **Enhanced Business Logic**:
   - More sophisticated analysis methods
   - Machine learning integration for pattern recognition

4. **Extensibility**:
   - Plugin system for custom model extensions
   - Better inheritance patterns for specialized models
import { OPERATORS } from "./pricing.constants.js";

export const PricingEngine = {
  applyRules({ basePrice, rules, signals }) {
    let price = basePrice;
    const appliedRules = [];

    for (const rule of rules) {
      if (!rule.enabled) continue;

      const signalValue = signals[rule.condition.field];
      if (signalValue === undefined) continue;

      const operatorFn = OPERATORS[rule.condition.operator];
      if (!operatorFn) continue;

      const isMatch = operatorFn(
        signalValue,
        rule.condition.value
      );

      if (!isMatch) continue;

      const delta =
        (price * rule.action.value) / 100;

      if (rule.action.type === "INCREASE_PERCENT") {
        price += delta;
      } else {
        price -= delta;
      }

      appliedRules.push(rule.name);
    }

    return { price, appliedRules };
  },
};
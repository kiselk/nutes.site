﻿
var litresInGallon = 3.78541;



    class Nutrient {


        constructor(name, amount) {
            this.name = name;
            this.amount = amount;
        }

        contents() {
            var output = this.name + " : " + this.amount.toFixed(5) + " mg";

            return output;
        }
    }

    class Solution {

        constructor(code, name) {
            this.code = code;
            this.name = name;
            this.nutrients = []
            this.amount = 0.0;
            this.solutionAmount = 0.0;
        this.ppm = 0.0;
        this.EC=0.0;
        this.ph =0.0;
        
        
        
        }

        setAmount(amount) {
            
            
            this.amount = amount;
        }

        contents() {
            var output = "";
            for (var i in this.nutrients) {
                output += this.nutrients[i].contents() + "\n";
            }
            return output;
        }


        addNutrient(addedNutrient) {
            var existingNutrient = null;
            this.nutrients.forEach(function(nutrient) {
                if (nutrient.name == addedNutrient.name) {
                    existingNutrient = nutrient;
                }
            });

            if (existingNutrient != null) {
                existingNutrient.amount += addedNutrient.amount;
            } else {
                this.nutrients.push(addedNutrient);
            }

        }

        getNutrientIndexByName(name) {

            for (var i in this.nutrients) {
                if (this.nutrients[i].name == name)
                    return i;
            }
            return null;
        }

        getNutrientByName(name) {
            var index = null;
            index = this.getNutrientIndexByName(name)
            if (index != null)
                return this.nutrients[index];
            else return null;

        }

        addSolution(solution) {
            
            
            this.EC += (solution.amount * solution.EC)/this.amount;
            
            this.ppm += (solution.amount * solution.ppm)/this.amount;
            
            this.ph = (this.ph*this.EC*this.amount + solution.ph*solution.EC*solution.amount)/(this.EC*this.amount+solution.EC*solution.amount);
            
            this.amount += solution.amount;
            this.solutionAmount += solution.amount;
            var me = this;
            solution.nutrients.forEach(function(nutrient) {
                me.addNutrient(nutrient);
            });
        }

        getTotalNutrients() {
            var totalNutrientsAmount = 0.0;
            var me = this;
            this.nutrients.forEach(function(nutrient) {
                totalNutrientsAmount += nutrient.amount;
            });
            return totalNutrientsAmount;
        }

        getTotalWater() {
            return this.amount - this.getTotalNutrients();
        }

        getAddedSolutionAmount() {
            return this.solutionAmount;
        }

        getTotal() {
            return this.amount;
        }

        getPH() {return this.ph;}
        getEC() {return this.EC;}
         getPPM(){return this.ppm;}
        
        
        
        getNER() {
            var output = "";
            var N = 0.0;
            var P = 0.0;
            var K = 0.0;
            var total = 0.0;
            var nutrientsAmount = 0.0;

            var N_ = this.getNutrientByName("N");
            var P_ = this.getNutrientByName("P");
            var K_ = this.getNutrientByName("K");

            if (N_ != null)
                N = N_.amount;
            if (P_ != null)
                P = P_.amount;
            if (K_ != null)
                K = K_.amount;

            total = this.getAddedSolutionAmount();
            nutrientsAmount = this.getTotalNutrients();
            var totalNER = N + P + K;

            //output += "N:P:K : " + (totalNER / N).toFixed(0) + ":" + (totalNER / P).toFixed(0) + ":" + (totalNER / K  ).toFixed(0) + "\n";


            output += "N:P:K - " +
                (100.0 * N / total).toFixed(1) +
                " : " +
                (100.0 * P / total).toFixed(1) +
                " : " +
                (100.0 * K / total).toFixed(1) +
                "\n";
            output += "Other: " + (100.0 * (nutrientsAmount - N - P - K) / total).toFixed(2) + "%" + "\n";


            return output;
        }
    }


    class FloraGrow extends Solution {

        constructor(amount) {
            super("grow", "Flora Grow");

            this.amount = amount;
            this.addNutrient(new Nutrient("N", 0.02 * amount));
            this.addNutrient(new Nutrient("P", 0.01 * amount));
            this.addNutrient(new Nutrient("K", 0.06 * amount));
            this.addNutrient(new Nutrient("Mg", 0.005 *  amount));
      this.EC = 260000;
        this.ppm = 132000;
        this.ph = (4.65 * (this.EC*1 + 20*99) - 8.0*20*99)/this.EC;
      
        
        }

      

    }

    class FloraMicro extends Solution {
        constructor(amount) {
            super("micro", "Flora Micro");
            this.amount = amount;
            this.addNutrient(new Nutrient("N", 0.05 * this.amount));
            this.addNutrient(new Nutrient("P", 0.01 * this.amount));
            this.addNutrient(new Nutrient("K", 0.01 * this.amount));
            this.addNutrient(new Nutrient("Ca", 0.05 * this.amount));
            this.addNutrient(new Nutrient("B", 0.0001 * this.amount));
            this.addNutrient(new Nutrient("Co", 0.000005 * this.amount));
            this.addNutrient(new Nutrient("Cu", 0.0001 * this.amount));
            this.addNutrient(new Nutrient("Fe", 0.001 * this.amount));
            this.addNutrient(new Nutrient("Mn", 0.0005 * this.amount));
            this.addNutrient(new Nutrient("Mo", 0.000008 * this.amount));
            this.addNutrient(new Nutrient("Zn", 0.00015 * this. amount));
            
              this.EC = 462000;
        this.ppm =230000;
        this.ph = (6.17 * (this.EC*1 + 20*99) - 8.0*20*99)/this.EC;
     
        
        
        
        }
    }


    class FloraBloom extends Solution {

        constructor(amount) {
            super("bloom", "Flora Bloom");
            this.amount = amount;
            this.addNutrient(new Nutrient("P", 0.05 * this.amount));
            this.addNutrient(new Nutrient("K", 0.04 * this.amount));
            this.addNutrient(new Nutrient("Mg", 0.015 * this.amount));
            this.addNutrient(new Nutrient("S", 0.01 * this.amount));
        
        
          this.EC = 221000;
        this.ppm =110000
    this.ph = (4.19 * (this.EC*1 + 20*99) - 8.0*20*99)/this.EC; 
        
         }

    }


    class RapidStart extends Solution {

        constructor(amount) {
            super("rapidstart", "Rapid Start");
            this.amount = amount;
            this.addNutrient(new Nutrient("N", 0.01 * this.amount));
            this.addNutrient(new Nutrient("P", 0.005 * this.amount));
            this.addNutrient(new Nutrient("K", 0.01 * this.amount));
            this.addNutrient(new Nutrient("Mo", 0.00001 * this.amount));

        
        
        
         this.EC = 122800;
        this.ppm = 61500;
        this.ph = (3.35 * (this.EC*1 + 20*99) - 8.0*20*99)/this.EC;
        
        
        
        }

    }


    class CalciumMagnesium extends Solution {

        constructor(amount) {
            super("camg", "Calcium Magnesium");
            this.amount = amount;
            this.addNutrient(new Nutrient("Ca", 0.04 * this.amount));
            this.addNutrient(new Nutrient("Mg", 0.01 * this.amount));

        }

    }


    class ArmorSi extends Solution {

        constructor(amount) {
            super("armorsi", "Armor Si");
            this.amount = amount;
            this.addNutrient(new Nutrient("K", 0.04 * this.amount));
            this.addNutrient(new Nutrient("Si", 0.1 * this.amount));

        
        
        
        
        
         this.EC = 107200;
        this.ppm = 54100;
        this.ph = (9.7 * (this.EC*1 + 20*99) - 8.0*20*99)/this.EC;
        
        
        
        }

    }


    class FloraNectar extends Solution {
        constructor(amount) {
            super("floranectar", "Flora Nectar");
            this.amount = amount;
            this.addNutrient(new Nutrient("K", 0.01 * this.amount));
            this.addNutrient(new Nutrient("Mg", 0.005 * this.amount));
            this.addNutrient(new Nutrient("S", 0.01 * this.amount));

        }
    }

    class DiamondNectar extends Solution {
        constructor(amount) {
            super("diamondnectar", "Diamond Nectar");
            this.amount = amount;
            this.addNutrient(new Nutrient("K", 0.01 * this.amount));
            this.addNutrient(new Nutrient("P", 0.01 * this.amount));
            this.addNutrient(new Nutrient("Leonardite Humic", 0.0001 * this.amount));


        
        
         this.EC = 31600;
        this.ppm =15100;
        this.ph = (4.91 * (this.EC*1 + 20*99) - 8.0*20*99)/this.EC;
        
        
        
        
        }
    }

    class KoolBloom extends Solution {
        constructor(amount) {
            super("koolbloom", "Liquid KoolBloom");
            this.amount = amount;
            this.addNutrient(new Nutrient("P", 0.1 * this.amount));
            this.addNutrient(new Nutrient("K", 0.1 * this.amount));

        }
    }

    class FloraliciousPlus extends Solution {
        constructor(amount) {
            super("floraliciousplus", "Floralicious Plus");
            this.amount = amount;

            this.addNutrient(new Nutrient("N", 0.028 * this.amount));
            this.addNutrient(new Nutrient("P", 0.008 * this.amount));
            this.addNutrient(new Nutrient("K", 0.0002 * this.amount));
            this.addNutrient(new Nutrient("K", 0.0002 * this.amount));

            this.addNutrient(new Nutrient("Vegetable Protein Hydrolosate", 0.001 * this.amount));
            this.addNutrient(new Nutrient("Sea Kelp", 0.001 * this.amount));
            this.addNutrient(new Nutrient("Potassium Sulphate", 0.001 * this.amount));
            this.addNutrient(new Nutrient("Micronized Leonardite", 0.001 * this.amount));
            this.addNutrient(new Nutrient("Complex Polysaccharides", 0.001 * this.amount));
            this.addNutrient(new Nutrient("Fructose", 0.001 * this.amount));
            this.addNutrient(new Nutrient("Vitamins", 0.001 * this.amount));
        
        
        
        
        
         this.EC = 100000;
        this.ppm =50000;
        this.ph = (4.49 * (this.EC*1 + 20*99) - 8.0*20*99)/this.EC;
        
        
        
        
        
        }
    }

    class FloraBlend extends Solution {
        constructor(amount) {
            super("florablend", "FloraBlend");
            this.amount = amount;
            this.addNutrient(new Nutrient("N", 0.005 * this.amount));
            this.addNutrient(new Nutrient("P", 0.01 * this.amount));
            this.addNutrient(new Nutrient("K", 0.01 * this.amount));
            this.addNutrient(new Nutrient("Alfalfa meal", 0.001 * this.amount));
            this.addNutrient(new Nutrient("Brewers yeast", 0.001 * this.amount));
            this.addNutrient(new Nutrient("cottonseed meal", 0.001 * this.amount));
            this.addNutrient(new Nutrient("Rock Phosphate", 0.001 * this.amount));
            this.addNutrient(new Nutrient("Sea Kelp", 0.001 * this.amount));
            this.addNutrient(new Nutrient("Soybean meal", 0.001 * this.amount));

        
        
         this.EC = 135300;
        this.ppm = 65900;
        this.ph = (3.45 * (this.EC*1 + 20*99) - 8.0*20*99)/this.EC;
        
        
        
        }
    }

    class Calimagic extends Solution {
        constructor(amount) {
            super("calimagic", "CALiMAGic");
            this.amount = amount;
            this.addNutrient(new Nutrient("N", 0.01 * this.amount));
            this.addNutrient(new Nutrient("Ca", 0.05 * this.amount));
            this.addNutrient(new Nutrient("Mg", 0.015 * this.amount));
            this.addNutrient(new Nutrient("Fe", 0.001 * this.amount));
        
        
        
        
        
         this.EC = 540000;
        this.ppm = 250000;
        this.ph = (7.1 * (this.EC*1 + 20*99) - 8.0*20*99)/this.EC;
        
        
        
        
        
        }

    }


    class PhUp extends Solution {
        constructor(amount) {
            super("phup", "pH UP");
            this.amount = amount;
            this.addNutrient(new Nutrient("Potassium Carbonate", 0.001 * this.amount));

        
        
        
        this.EC = 223000;
        this.ppm = 112000;
        this.ph = (10.97 * (this.EC*1 + 20*99) - 8.0*20*99)/this.EC;
        
         
        
        
        
        
        }
    }

    class PhDown extends Solution {
        constructor(amount) {
            super("phdown", "pH DOWN");
            this.amount = amount;
            this.addNutrient(new Nutrient("Phosphoric Acid", 0.001 * this.amount));

        }
    }


    class Gallons extends Solution {
        constructor(amount) {

            super("Gallon");

            this.amount = amount;


            this.addSolution(new ArmorSi(1.0 * this.amount / litresInGallon));
            this.addSolution(new CalciumMagnesium(5.0 * this.amount / litresInGallon));
            this.addSolution(new FloraGrow(5.0 * this.amount / litresInGallon));
            this.addSolution(new FloraMicro(5.0 * this.amount / litresInGallon));
            this.addSolution(new FloraBloom(2.0 * this.amount / litresInGallon));
            this.addSolution(new RapidStart(2.0 * this.amount / litresInGallon));
        }


    } 
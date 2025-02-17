// priority: 10
//   __   ___   _    _  _ ___ _    ___ ___   _       ____ 
//   \ \ / /_\ | |  | || | __| |  / __|_ _| /_\     | ___|
//    \ V / _ \| |__| __ | _|| |__\__ \| | / _ \    |___ \
//     \_/_/ \_\____|_||_|___|____|___/___/_/ \_\   |____/
//

/**
 * @file Shaped recipe additions for Valhelsia 5.
 * 
 * Contains several convenience functions for frequently used shapes.
 * 
 * @see shapeless.js
 * 
 * @copyright Valhelsia Inc 2022
 */

/**
 * Shaped Recipe Event Handler
 */
 ServerEvents.recipes(event => {

  // Convenience Functions:
  const shaped2x2 = (output, input) => {event.shaped(output, ['AA', 'AA'], {A: input})};
  const shaped3x3 = (output, input) => {event.shaped(output, ['AAA', 'AAA', 'AAA'], {A: input})};
  const donut = (output, input) => {event.shaped(output, ['AAA', 'A A', 'AAA'], {A: input})};
  const wrapped = (output, core, wrap) => {event.shaped(output, ['AAA', 'ABA', 'AAA'], {A: wrap, B: core})};
  const barrel = (output, plank, slab) => {event.shaped(output, ['ABA', 'A A', 'ABA'], {A: plank, B: slab})};

  // Valhelsia
  // wrapped(Item.of('akashictome:tome', AKASHIC_TOME_NBT), '#forge:bookshelves', 'minecraft:book');

  // Minecraft
  shaped3x3('minecraft:cobweb', 'minecraft:string');

  event.shaped('minecraft:dispenser', [
    'AAA',
    'ABA',
    'ACA'
  ], {
    A: '#forge:cobblestone',
    B: 'minecraft:crossbow',
    C: 'minecraft:redstone'
  });

  event.shaped('minecraft:dispenser', [
    'RS ',
    'RDS',
    'RS '
  ], {
    R: '#forge:rods/wooden',
    S: '#forge:string',
    D: 'minecraft:dropper'
  });

  event.shaped('minecraft:chainmail_helmet', [
    'AAA',
    'A A'
  ], {
    A: 'minecraft:chain'
  });

  event.shaped('minecraft:chainmail_chestplate', [
    'A A',
    'AAA',
    'AAA'
  ], {
    A: 'minecraft:chain'
  });

  event.shaped('minecraft:chainmail_leggings', [
    'AAA',
    'A A',
    'A A'
  ], {
    A: 'minecraft:chain'
  });

  event.shaped('minecraft:chainmail_boots', [
    'A A',
    'A A'
  ], {
    A: 'minecraft:chain'
  });

  event.shaped('minecraft:bundle', [
    'SCS',
    'C C',
    'CCC'
  ], {
    S: '#forge:string',
    C: 'farmersdelight:canvas'
  });

  event.shaped('minecraft:bookshelf', [
    'AAA',
    'BBB',
    'AAA'
  ], {
    A: '#minecraft:planks',
    B: 'minecraft:book'
  });
  
  event.shaped('4x minecraft:ladder', [
    'A A',
    'ABA',
    'A A'
  ], {
    A: '#forge:rods/wooden',
    B: '#minecraft:planks'
  });

  event.shaped('minecraft:chest', [
    'AAA',
    'A A',
    'AAA'
  ], {
    A: '#minecraft:planks'
  });

  // Ars Nouveau
  event.shaped('ars_nouveau:novice_spell_book', [
    'ABC',
    'DE ',
    '   ',
  ], {
    A: 'minecraft:book',
    B: 'forbidden_arcanus:deorum_shovel',
    C: 'forbidden_arcanus:deorum_pickaxe',
    D: 'forbidden_arcanus:deorum_axe',
    E: 'forbidden_arcanus:deorum_sword',
  });

  event.shaped('ars_nouveau:apprentice_spell_book', [
    'ABC',
    'CCD',
    'DEE',
  ], {
    A: 'ars_nouveau:novice_spell_book',
    B: 'forbidden_arcanus:obsidian_skull',
    C: 'sullysmod:polished_jade',
    D: 'create:polished_rose_quartz',
    E: 'minecraft:blaze_rod',
  });

  event.shaped('ars_nouveau:archmage_spell_book', [
    'ABC',
    'DDE',
    'EEF',
  ], {
    A: 'ars_nouveau:apprentice_spell_book',
    B: 'forbidden_arcanus:dark_nether_star',
    C: 'ars_nouveau:wilden_tribute',
    D: 'forbidden_arcanus:stellarite_piece',
    E: 'alexsmobs:void_worm_eye',
    F: 'minecraft:totem_of_undying',
  });

  // Biomes O' Plenty
  event.shaped ('6x biomesoplenty:hellbark_slab', [
    'AAA'
  ], {
    A: 'biomesoplenty:hellbark_planks'
  });


  // Create

  // Decorative Blocks
  event.shaped('2x decorative_blocks:chain', [
    'A',
    'B',
    'A'
  ], {
    A: 'minecraft:iron_ingot',
    B: 'minecraft:iron_nugget'
  });

  event.shaped('4x decorative_blocks:rocky_dirt', [
    'AB',
    'BA'
  ], {
    A: 'minecraft:dirt',
    B: '#forge:cobblestone'
  });

  // Ecologics
  event.shaped ('6x ecologics:azalea_slab', [
    'AAA'
  ], {
    A: 'ecologics:azalea_planks'
  });

  event.shaped ('6x ecologics:flowering_azalea_slab', [
    'AAA'
  ], {
    A: 'ecologics:flowering_azalea_planks'
  });

  // Farmer's Delight
  shaped3x3('farmersdelight:organic_compost', 'minecolonies:compost');

  // Forbidden & Arcanus
  event.shaped('forbidden_arcanus:deorum_chain', [
    'A',
    'B',
    'A'
  ], {
    A: 'forbidden_arcanus:deorum_nugget',
    B: 'forbidden_arcanus:deorum_ingot'
  });

  // Immersive Engineering
  shaped3x3('immersiveengineering:storage_silver', '#forge:ingots/silver');

  // Sophisticated Backpacks
  event.shaped('sophisticatedbackpacks:backpack', [
    'ACA',
    'BDB',
    'BBB'
  ], {
    A: '#valhelsia:ropes',
    B: '#forge:leather',
    C: 'quark:ravager_hide',
    D: '#forge:chests/wooden'
  });

});

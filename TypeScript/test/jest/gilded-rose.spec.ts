import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose characterization tests', () => {
  // Verifica que un ítem normal reduzca su quality en 1
  // y su sellIn en 1 mientras aún no vence.
  it('normal item quality decreases by 1 before sell date', () => {
    const gildedRose = new GildedRose([new Item('Normal Item', 10, 20)]);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(19);
    expect(items[0].sellIn).toBe(9);
  });

  // Verifica que un ítem normal, al llegar a la fecha de venta,
  // degrade su quality al doble de velocidad.
  it('normal item quality decreases by 2 after sell date', () => {
    const gildedRose = new GildedRose([new Item('Normal Item', 0, 20)]);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(18);
    expect(items[0].sellIn).toBe(-1);
  });

  // Verifica que la quality nunca baje de 0,
  // aunque el ítem siga actualizándose.
  it('normal item quality never goes below zero', () => {
    const gildedRose = new GildedRose([new Item('Normal Item', 5, 0)]);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(0);
    expect(items[0].sellIn).toBe(4);
  });

  // NUEVO TEST:
  // Verifica que un ítem normal vencido tampoco baje su quality por debajo de 0.
  it('normal item quality does not go below zero after sell date', () => {
    const gildedRose = new GildedRose([new Item('Normal Item', 0, 1)]);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(0);
    expect(items[0].sellIn).toBe(-1);
  });

  // Verifica que Aged Brie aumente su quality con el tiempo
  // en lugar de disminuir como un ítem normal.
  it('aged brie increases quality over time', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 5, 10)]);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(11);
    expect(items[0].sellIn).toBe(4);
  });

  // Verifica que Aged Brie, una vez vencida la fecha de venta,
  // aumente su quality en 2.
  it('aged brie increases quality by 2 after sell date', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 0, 10)]);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(12);
    expect(items[0].sellIn).toBe(-1);
  });

  // Verifica que Aged Brie no sobrepase el límite máximo de quality,
  // que es 50.
  it('aged brie quality never exceeds 50', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 5, 50)]);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(50);
    expect(items[0].sellIn).toBe(4);
  });

  // NUEVO TEST:
  // Verifica que Aged Brie vencido no sobrepase el límite máximo de quality.
  it('aged brie does not exceed quality 50 after sell date', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 0, 49)]);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(50);
    expect(items[0].sellIn).toBe(-1);
  });

  // Verifica que Sulfuras no cambie ni en quality ni en sellIn,
  // ya que es un ítem legendario.
  it('sulfuras never changes', () => {
    const gildedRose = new GildedRose([
      new Item('Sulfuras, Hand of Ragnaros', 0, 80),
    ]);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(80);
    expect(items[0].sellIn).toBe(0);
  });

  // NUEVO TEST:
  // Verifica que Sulfuras tampoco cambie aunque tenga días disponibles antes de vencer.
  it('sulfuras remains unchanged even before sell date', () => {
    const gildedRose = new GildedRose([
      new Item('Sulfuras, Hand of Ragnaros', 5, 80),
    ]);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(80);
    expect(items[0].sellIn).toBe(5);
  });

  // Verifica que las entradas de backstage aumenten su quality en 1
  // cuando faltan más de 10 días para el concierto.
  it('backstage passes increase by 1 when sellIn is greater than 10', () => {
    const gildedRose = new GildedRose([
      new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20),
    ]);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(21);
    expect(items[0].sellIn).toBe(14);
  });

  // Verifica que las entradas de backstage aumenten su quality en 2
  // cuando faltan 10 días o menos para el concierto.
  it('backstage passes increase by 2 when sellIn is 10 or less', () => {
    const gildedRose = new GildedRose([
      new Item('Backstage passes to a TAFKAL80ETC concert', 10, 20),
    ]);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(22);
    expect(items[0].sellIn).toBe(9);
  });

  // Verifica que las entradas de backstage aumenten su quality en 3
  // cuando faltan 5 días o menos para el concierto.
  it('backstage passes increase by 3 when sellIn is 5 or less', () => {
    const gildedRose = new GildedRose([
      new Item('Backstage passes to a TAFKAL80ETC concert', 5, 20),
    ]);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(23);
    expect(items[0].sellIn).toBe(4);
  });

  // NUEVO TEST:
  // Verifica que las entradas de backstage no sobrepasen quality 50
  // aunque deban aumentar en 3.
  it('backstage passes quality does not exceed 50 near concert date', () => {
    const gildedRose = new GildedRose([
      new Item('Backstage passes to a TAFKAL80ETC concert', 5, 48),
    ]);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(50);
    expect(items[0].sellIn).toBe(4);
  });

  // Verifica que las entradas de backstage pierdan todo su valor
  // después del concierto y su quality quede en 0.
  it('backstage passes drop to 0 after the concert', () => {
    const gildedRose = new GildedRose([
      new Item('Backstage passes to a TAFKAL80ETC concert', 0, 20),
    ]);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(0);
    expect(items[0].sellIn).toBe(-1);
  });
});
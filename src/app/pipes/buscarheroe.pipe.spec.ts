import { BuscarheroePipe } from './buscarheroe.pipe';

describe('BuscarheroePipe', () => {
  let pipe: BuscarheroePipe;

  beforeEach(() => {
    pipe = new BuscarheroePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('debería devolver todos los heroes pasando string vacio', () => {
    const heroes = [
      { id: 1, name: 'Spider-Man' },
      { id: 2, name: 'Iron Man' },
      { id: 3, name: 'Thor' }
    ];
    const result = pipe.transform(heroes, '');
    expect(result).toEqual(heroes);
  });

  it('debería devolver todos los heroes ya que solo se le pasa 2 letras', () => {
    const heroes = [
      { id: 1, name: 'Spider-Man' },
      { id: 2, name: 'Iron Man' },
      { id: 3, name: 'Thor' }
    ];
    const result = pipe.transform(heroes, 'th');
    expect(result).toEqual(heroes);
  });

  it('debería devolver todos los heroes que contengan la palabra man', () => {
    const heroes = [
      { id: 1, name: 'Spider-Man' },
      { id: 2, name: 'Iron Man' },
      { id: 3, name: 'Thor' }
    ];
    const result = pipe.transform(heroes, 'man');
    expect(result.length).toBe(2);
    expect(result).toContain(heroes[0]);
    expect(result).toContain(heroes[1]);
  });

  it('debería darte solo el heroes Spider-man', () => {
    const heroes = [
      { id: 1, name: 'Spider-Man' },
      { id: 2, name: 'Iron Man' },
      { id: 3, name: 'Thor' }
    ];
    const result = pipe.transform(heroes, 'spider');
    expect(result.length).toBe(1);
    expect(result).toContain(heroes[0]);
  });

  it('no debería devolverte ningún  heroe', () => {
    const heroes = [
      { id: 1, name: 'Spider-Man' },
      { id: 2, name: 'Iron Man' },
      { id: 3, name: 'Thor' }
    ];
    const result = pipe.transform(heroes, 'hulk');
    expect(result.length).toBe(0);
  });

});

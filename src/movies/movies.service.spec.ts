import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('shoud return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    it('shoud return an movie', () => {
      service.createMovie({
        title: 'Test Movie',
        genres: ['test'],
        year: 1985,
      });
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });
    it('shoud throw 404 error', () => {
      try {
        service.getOne(99);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual(`movie with Id 99 not found`);
      }
    });
  });

  describe('deleteOne', () => {
    it('delete a movie', () => {
      service.createMovie({
        title: 'Test Movie',
        genres: ['test'],
        year: 1985,
      });
      const allMovies = service.getAll();
      service.deleteOne(1);
      const afterDelete = service.getAll();
      expect(afterDelete.length).toEqual(allMovies.length - 1);
    });
    it('should return a 404', () => {
      try {
        service.deleteOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('create', () => {
    it('should create a movie', () => {
      const beforeCreate = service.getAll().length;
      service.createMovie({
        title: 'Test Movie',
        genres: ['test'],
        year: 1985,
      });
      const afterCreate = service.getAll().length;
      expect(afterCreate).toEqual(beforeCreate + 1);
    });
  });

  describe('update', () => {
    it('업데이트 무비', () => {
      service.createMovie({
        title: 'Test Movie',
        genres: ['test'],
        year: 1985,
      });
      service.updateMovie(1, {
        title: 'updated test',
      });
      const movie = service.getOne(1);
      expect(movie.title).toEqual('updated test');
    });
  });
});

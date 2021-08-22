import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  @Get()
  getAll() {
    return 'This will return all movies';
  }

  @Get('/:id')
  getOne(@Param('id') movieId: string) {
    return `will return one movie with the movieId: ${movieId}`;
  }

  @Post()
  create() {
    return `This will create a movie`;
  }

  @Delete(`/:id`)
  delete(@Param(`id`) movieId: string) {
    return `this will delete a movie movieId:${movieId}`;
  }

  @Put(`/:id`)
  patch(@Param(`id`) movieId: string) {
    return `thus will update a movie movieId:${movieId}`;
  }
}

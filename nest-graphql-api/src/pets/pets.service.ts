import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OwnersService } from '../owners/owners.service';
import { FindOneOptions, Repository } from 'typeorm';
import { CreatePetInput } from './dto/createPet.input';
import { Pet } from './pet.entity';
import { Owner } from '../owners/entities/owner.entity';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet) private petsRepository: Repository<Pet>,
    private ownersService: OwnersService,
  ) {}
  async findAll(): Promise<Pet[]> {
    return this.petsRepository.find();
  }

  async createPet(createPetInput: CreatePetInput): Promise<Pet> {
    const newPet = this.petsRepository.create(createPetInput);
    return this.petsRepository.save(newPet);
  }

  findOne(id: FindOneOptions<Pet>): Promise<Pet> {
    return this.petsRepository.findOneOrFail(id);
  }

  getOwner(ownerId: number): Promise<Owner> {
    return this.ownersService.findOne({ where: { id: ownerId } });
  }
}

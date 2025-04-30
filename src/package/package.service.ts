/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';
import { sendEmail } from 'src/utils/functions';

@Injectable()
export class PackageService {
  constructor(private readonly databaseService: DatabaseService){}
  
  async create(createPackageDto: Prisma.PackageCreateInput) {
    try {

      const newPackage = await this.databaseService.package.create({data: createPackageDto})

      sendEmail(`sepconceptz@gmail.com`,
        `<div>New Package: <strong>${newPackage.name}</strong> has been created successfully.
        <p>If you do not recognize this activity, please contact support now.</p>
        <p>Sparkling Event Planners<br/>
        FCT, Abuja
        </div>`,
        'Package Notification',
        'Notification'
      )

      return newPackage

    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  createSubPackage(subPackageDto: Prisma.PackageBundleCreateInput) {
    return this.databaseService.packageBundle.create({data: subPackageDto});
  }

  findAll() {
    return this.databaseService.package.findMany();
  }

  findPackageItems(name: string) {
    return this.databaseService.package.findFirst({
      where: {name: name},
      include: {PackageBundle: true}
    });
  }

  findBySubPackageName(name: string) {
    return this.databaseService.packageBundle.findFirst({
      where: {name},
      include: {package: true}
    });
  }

  findOne(id: string) {
    return this.databaseService.package.findFirst({where:{id}, include: {PackageBundle: true}});
  }

  update(id: string, updatePackageDto: Prisma.PackageUpdateInput) {
    return this.databaseService.package.update({
      where:{id},
      data: updatePackageDto,
      include: {PackageBundle: true}
    });
  }

  updateSubPackage(id: string, updatePackageDto: Prisma.PackageBundleUpdateInput) {
    return this.databaseService.packageBundle.update({
      where:{id},
      data: updatePackageDto,
      include: {package: true}
    });
  }

  remove(id: string) {
    return this.databaseService.package.delete({where: {id}})
  }
}
